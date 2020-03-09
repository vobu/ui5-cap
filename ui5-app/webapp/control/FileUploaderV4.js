// Source: https://blogs.sap.com/2019/09/30/extending-upload-collection-and-file-uploader-to-call-put-method-during-file-upload/
// Author: Arindam Seth - https://people.sap.com/arindam.seth
sap.ui.define(["sap/ui/unified/FileUploader"], FileUploader => {
    return FileUploader.extend("CustomFileUploader", {
        metadata: {},

        _sendFilesWithXHR(aFiles) {
            let iFiles,
                sHeader,
                sValue,
                oXhrEntry,
                oXHRSettings = this.getXhrSettings()

            if (aFiles.length > 0) {
                if (this.getUseMultipart()) {
                    //one xhr request for all files
                    iFiles = 1
                } else {
                    //several xhr requests for every file
                    iFiles = aFiles.length
                }
                // Save references to already uploading files if a new upload comes between upload and complete or abort
                this._aXhr = this._aXhr || []
                for (let j = 0; j < iFiles; j++) {
                    //keep a reference on the current upload xhr
                    this._uploadXHR = new window.XMLHttpRequest()

                    oXhrEntry = {
                        xhr: this._uploadXHR,
                        requestHeaders: []
                    }
                    this._aXhr.push(oXhrEntry)
                    // this is the only change! orig: POST
                    oXhrEntry.xhr.open("PUT", this.getUploadUrl(), true)
                    if (oXHRSettings) {
                        oXhrEntry.xhr.withCredentials = oXHRSettings.getWithCredentials()
                    }
                    if (this.getHeaderParameters()) {
                        let aHeaderParams = this.getHeaderParameters()
                        for (let i = 0; i < aHeaderParams.length; i++) {
                            sHeader = aHeaderParams[i].getName()
                            sValue = aHeaderParams[i].getValue()
                            oXhrEntry.requestHeaders.push({
                                name: sHeader,
                                value: sValue
                            })
                        }
                    }
                    let sFilename = aFiles[j].name
                    let aRequestHeaders = oXhrEntry.requestHeaders
                    oXhrEntry.fileName = sFilename
                    oXhrEntry.file = aFiles[j]
                    this.fireUploadStart({
                        fileName: sFilename,
                        requestHeaders: aRequestHeaders
                    })
                    for (let k = 0; k < aRequestHeaders.length; k++) {
                        // Check if request is still open in case abort() was called.
                        if (oXhrEntry.xhr.readyState === 0) {
                            break
                        }
                        sHeader = aRequestHeaders[k].name
                        sValue = aRequestHeaders[k].value
                        oXhrEntry.xhr.setRequestHeader(sHeader, sValue)
                    }
                }
                if (this.getUseMultipart()) {
                    let formData = new window.FormData()
                    let name = this.FUEl.name
                    for (let l = 0; l < aFiles.length; l++) {
                        this._appendFileToFormData(formData, name, aFiles[l])
                    }
                    formData.append("_charset_", "UTF-8")
                    let data = this.FUDataEl.name
                    if (this.getAdditionalData()) {
                        let sData = this.getAdditionalData()
                        formData.append(data, sData)
                    } else {
                        formData.append(data, "")
                    }
                    if (this.getParameters()) {
                        let oParams = this.getParameters()
                        for (let m = 0; m < oParams.length; m++) {
                            let sName = oParams[m].getName()
                            sValue = oParams[m].getValue()
                            formData.append(sName, sValue)
                        }
                    }
                    oXhrEntry.file = formData
                    this.sendFiles(this._aXhr, 0)
                } else {
                    this.sendFiles(this._aXhr, 0)
                }
                this._bUploading = false
                this._resetValueAfterUploadStart()
            }

            return this
        },
        renderer: "sap.ui.unified.FileUploaderRenderer"
    })
})
