function myHello () {
    return 'Hello World'
}
function myByebye () {
    return 'Bye Bye'
}
const MAX_PIC_WIDTH = 1200
const a = MAX_PIC_WIDTH / 3

// public interface of the module
exports.myHello = myHello
exports.myByebye = myByebye
exports.MPW = MAX_PIC_WIDTH
exports.MAX_PIC_WIDTH = MAX_PIC_WIDTH
