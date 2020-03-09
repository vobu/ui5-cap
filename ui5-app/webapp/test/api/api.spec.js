describe("api", () => {
    it("should query v4 $metadata", () => {
        const res = request.get("http://localhost:4004/dumpster").do()

        expect(res).body(responseBody => {
            responseBody.should.have.property("@odata.context", "$metadata")
        })
    })
})