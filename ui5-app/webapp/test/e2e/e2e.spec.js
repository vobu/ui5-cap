const viewNS = "test.Sample.view"

const oUploadControl = element(
    by.control({
        id: "FileUploader",
        viewName: `${viewNS}.Main`
    })
)
const oUploadButton = element(
    by.control({
        id: "UploadButton",
        viewName: `${viewNS}.Main`
    })
)

const mainPageObjects = createPageObjects({
    Main: {
        arrangements: {
            iStartTheApp: () => {}
        },
        actions: {
            iUploadAFile: () => {
                // short uiveri5-form
                oUploadControl.sendKeys(
                    "/Users/vbuzek/git/ui5-ecosystem-showcase/packages/ui5-app/webapp/test/e2e/fixtures/ui5_logo.png"
                )
                oUploadButton.click()

                // debug-capable notation
                // oUploadControl
                //     .getAttribute("id")
                //     .then(sId => {
                //         oUploadControl.sendKeys(
                //             "/Users/vbuzek/git/ui5-ecosystem-showcase/packages/ui5-app/webapp/test/e2e/fixtures/ui5_logo.png"
                //         )
                //         oUploadButton.click()
                //     })
                //     .catch(err => {
                //         console.error(err)
                //     })
            }
        },
        assertions: {
            thereShouldBeUploadedFiles(iNrOfUploads) {
                const oListItems = element.all(
                    by.control({
                        controlType: "sap.m.CustomListItem",
                        viewName: `${viewNS}.Main`
                    })
                )

                // short uiveri5-form
                expect(oListItems.count()).toBeGreaterThanOrEqual(iNrOfUploads)

                // debug-capable notation
                // oListItems
                //     .count()
                //     .then(iResult => {
                //         return expect(iResult).toBeGreaterThanOrEqual(iNrOfUploads)
                //     })
                //     .catch(err => {
                //         console.error(err)
                //     })
            }
        }
    }
})

describe("e2e", () => {
    it("should upload a media resource", () => {
        Given.iStartTheApp()
        When.onTheMainPage.iUploadAFile()
        Then.onTheMainPage.thereShouldBeUploadedFiles(1)
    })
})
