import * as color from "./color"
// @ponicode
describe("color.paintColorHashtagLine", () => {
    test("0", () => {
        let callFunction: any = () => {
            color.paintColorHashtagLine(document.querySelector("canvas:first-of-type"), undefined)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            color.paintColorHashtagLine(document.querySelector("div:first-of-type"), undefined)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            color.paintColorHashtagLine(document.querySelector("span:first-of-type"), undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
