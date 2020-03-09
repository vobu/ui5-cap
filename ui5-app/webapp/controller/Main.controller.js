sap.ui.define(["test/Sample/controller/BaseController", "sap/m/MessageToast"], (Controller, MessageToast) => {
    "use strict"

    return Controller.extend("test.Sample.controller.Main", {
        // (live) transpiling async functions to ES5 generators not yet doable in ui5-tooling ecosys :)
        /* async */ onInit() {
            // let response;
            // let oLatestUI5 = {
            //     version: "n/a"
            // };
            // try {
            //     response = await fetch('/proxy/api/v1/latest?format=json');
            //     oLatestUI5 = await response.json();
            // } catch (err) {
            //     console.error(err)
            // }
            // this.getModel('LatestUI5').setProperty("/latest", latestU5version.version)

            fetch("/proxy/api/v1/latest?format=json")
                .then(response => response.json())
                .then(latestU5version => {
                    this.getModel("LatestUI5").setProperty("/latest", latestU5version.version)
                })
                .catch(err => console.error(err))
        },

        navFwd() {
            return this.getOwnerComponent()
                .getRouter()
                .navTo("RouteOther")
        },

        handleUploadPress(oEvent) {
            const oFileUploader = this.byId("FileUploader")
            if (oFileUploader.getValue() === "") {
                return MessageToast.show(this.getResourceBundle().getText("startPage.upload.chooseFileText"))
            }

            // lastModified
            // lastModifiedDate
            // name
            // size
            // type
            const oUploadedFile = oFileUploader.oFileUpload.files[0]

            const _fileLastModified = oUploadedFile.lastModifiedDate
                ? oUploadedFile.lastModifiedDate.toISOString()
                : new Date().toISOString()

            // no primary key needed for payload
            // cap aspect cuid auto-inserts one
            const oPayload = {
                mediatype: oUploadedFile.type,
                name: oUploadedFile.name,
                size: oUploadedFile.size,
                fileLastModified: _fileLastModified
            }

            // create entry in persistence for uploaded item
            fetch(`${oFileUploader.getUploadUrl()}`, {
                method: "POST",
                body: JSON.stringify(oPayload),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => {
                    // exit early if a technical http error happened
                    if (!response.ok) {
                        throw new Error(`${response.status} - ${response.statusText}`)
                    }
                    return response.json() // make response human readable -> also a Promise!
                })
                .then(decodedResponse => {
                    // decodedResponse:
                    // BE provided auto-insert style an ID
                    // and returns it for the before-happended POST

                    // upload of the actual item content!
                    // (via PUT in custom control FileUploader)
                    // (also note the useMultipart=false setting on FileUploader!)
                    oFileUploader.setUploadUrl(`${oFileUploader.getUploadUrl()}(${decodedResponse.ID})/content`)
                    oFileUploader.setSendXHR(true)
                    oFileUploader.upload()
                })
                .catch(err => {
                    MessageToast.show(`Error: ${err}`)
                })
        },

        onUploadComplete(oEvent) {
            const iStatus = oEvent.getParameter("status")
            let sMsg = ""
            if (iStatus === 204) {
                sMsg = `Return Code ${iStatus} - Success`
                oEvent.getSource().setValue("")
                this.byId("ListOfItems")
                    .getBinding("items")
                    .refresh()
            } else {
                sMsg = `Error: ${oEvent.getParameter("response")}`
            }

            MessageToast.show(sMsg)
        },

        onMediaPress(sGuid) {
            this.getModel("PreviewImg").setProperty("/imgSrc", `/cap/dumpster/Items(${sGuid})/content`)
        }
    })
})
