describe("Nuestro Primer Test", () => {
    test("Debe revisar que 1 + 1 sean 2", () => {
        expect(1 + 1).toBe(2)
    })

    test("Debe revisar que 1 + 1 no sean 3", () => {
        expect(1 + 1).not.toBe(3)
    })
})