"use strict";
const index_1 = require('../../render/index');
const ffi_1 = require('../../util/ffi');
const types_1 = require('../../types/types');
const ref = require('ref');
const sdl_error_1 = require('../../basic/sdl-error');
const buffer_util_1 = require('../../util/buffer-util');
const struct_1 = require('./struct');
const rect_1 = require('../../rect');
const console_1 = require('../../log/console');
let lib = Object.create(null);
ffi_1.library({
    SDL_CreateWindow: [struct_1.Window_p, [types_1.default.CString, types_1.default.int, types_1.default.int, types_1.default.int, types_1.default.int, types_1.default.uint32]],
    SDL_CreateWindowAndRenderer: [types_1.default.int, [types_1.default.int, types_1.default.int, types_1.default.uint32, ref.refType(struct_1.Window_p), ref.refType(index_1.Render_p)]],
    SDL_CreateWindowFrom: [struct_1.Window_p, [types_1.default.void_p]],
    SDL_DestroyWindow: [types_1.default.void, [types_1.default.void_p]],
    SDL_DisableScreenSaver: [types_1.default.void, []],
    SDL_EnableScreenSaver: [types_1.default.void, []],
    SDL_GL_CreateContext: [types_1.default.void_p, [types_1.default.void_p]],
    SDL_GL_DeleteContext: [types_1.default.void, [types_1.default.void_p]],
    SDL_GL_ExtensionSupported: [types_1.default.uint8, [types_1.default.CString]],
    SDL_GL_GetAttribute: [types_1.default.int, [types_1.default.uint32, types_1.default.int_p]],
    SDL_GL_GetCurrentContext: [types_1.default.void_p, []],
    SDL_GL_GetCurrentWindow: [types_1.default.void_p, []],
    SDL_GL_GetDrawableSize: [types_1.default.void, [types_1.default.void_p, types_1.default.int_p, types_1.default.int_p]],
    SDL_GL_GetProcAddress: [types_1.default.void_p, [types_1.default.CString]],
    SDL_GL_GetSwapInterval: [types_1.default.int, []],
    SDL_GL_LoadLibrary: [types_1.default.int, [types_1.default.CString]],
    SDL_GL_MakeCurrent: [types_1.default.int, [types_1.default.void_p, types_1.default.void_p]],
    SDL_GL_ResetAttributes: [types_1.default.void, []],
    SDL_GL_SetSwapInterval: [types_1.default.int, [types_1.default.int]],
    SDL_GL_SwapWindow: [types_1.default.void, [types_1.default.void_p]],
    SDL_GL_UnloadLibrary: [types_1.default.void, []],
    SDL_GetClosestDisplayMode: [struct_1.DisplayMode_p, [types_1.default.int, struct_1.DisplayMode_p, struct_1.DisplayMode_p]],
    SDL_GetCurrentDisplayMode: [types_1.default.int, [types_1.default.int, struct_1.DisplayMode_p]],
    SDL_GetCurrentVideoDriver: [types_1.default.CString, []],
    SDL_GetDesktopDisplayMode: [types_1.default.int, [types_1.default.int, struct_1.DisplayMode_p]],
    SDL_GetDisplayBounds: [types_1.default.int, [types_1.default.int, rect_1.Rect_p]],
    SDL_GetDisplayDPI: [types_1.default.int, [types_1.default.int, types_1.default.float_p, types_1.default.float_p, types_1.default.float_p]],
    SDL_GetDisplayMode: [types_1.default.int, [types_1.default.int, types_1.default.int, struct_1.DisplayMode_p]],
    SDL_GetDisplayName: [types_1.default.CString_p, [types_1.default.int]],
    // SDL_GetDisplayUsableBounds: [types.int, [types.int, Rect_p]],
    SDL_GetGrabbedWindow: [struct_1.Window_p, []],
    SDL_GetNumDisplayModes: [types_1.default.int, [types_1.default.int]],
    SDL_GetNumVideoDisplays: [types_1.default.int, []],
    SDL_GetNumVideoDrivers: [types_1.default.int, []],
    SDL_GetVideoDriver: [types_1.default.CString_p, [types_1.default.int]],
    SDL_GetWindowBordersSize: [types_1.default.int, [struct_1.Window_p, types_1.default.int_p, types_1.default.int_p, types_1.default.int_p, types_1.default.int_p]],
    SDL_GL_SetAttribute: [types_1.default.int, [types_1.default.uint32, types_1.default.int]]
}, lib);
function createWindow(title, x, y, w, h, flags) {
    let ret = lib.SDL_CreateWindow(title, x, y, w, h, flags);
    if (ret == null) {
        console_1.error(sdl_error_1.getError());
        return null;
    }
    return ret;
}
exports.createWindow = createWindow;
/**
 *
 */
function createWindowAndRenderer(w, h, flags) {
    let window = ref.alloc(types_1.default.void_p);
    let renderer = ref.alloc(types_1.default.void_p);
    let ret = lib.SDL_CreateWindowAndRenderer(w, h, flags, window, renderer);
    if (ret < 0) {
        console_1.error(sdl_error_1.getError());
        return {
            window: null,
            renderer: null
        };
    }
    return {
        window,
        renderer
    };
}
exports.createWindowAndRenderer = createWindowAndRenderer;
function createWindowFrom() {
    //
}
exports.createWindowFrom = createWindowFrom;
function destroyWindow(window) {
    lib.SDL_DestroyWindow(window);
}
exports.destroyWindow = destroyWindow;
/**
 * 禁用屏幕保护程序，在 SDL 退出后会重新启用。
 */
function disableScreenSaver() {
    lib.SDL_DisableScreenSaver();
}
exports.disableScreenSaver = disableScreenSaver;
function enableScreenSaver() {
    lib.SDL_EnableScreenSaver();
}
exports.enableScreenSaver = enableScreenSaver;
/**
 * 为当前窗口创建 openGL 上下文， 以使用 openGL 绘图
 */
function glCreateContext(window) {
    return lib.SDL_GL_CreateContext(window);
}
exports.glCreateContext = glCreateContext;
function glDeleteContext(context) {
    lib.SDL_GL_DeleteContext(context);
}
exports.glDeleteContext = glDeleteContext;
function glExtensionSupported(extension) {
    return !!lib.SDL_GL_ExtensionSupported(extension);
}
exports.glExtensionSupported = glExtensionSupported;
/**
 * 获取当前活跃的 openGL context。
 * @return 调用成功时返回openGL context， 否则返回 null。 调用 getError 获取错误信息
 */
function glGetCurrentContext() {
    let ret = lib.SDL_GL_GetCurrentContext();
    return buffer_util_1.nullOrSelf(ret);
}
exports.glGetCurrentContext = glGetCurrentContext;
function glGetCurrentWindow() {
    let ret = lib.SDL_GL_GetCurrentWindow();
    return buffer_util_1.nullOrSelf(ret);
}
exports.glGetCurrentWindow = glGetCurrentWindow;
// todo 这个函数与 SDL_GetWindowSize 在高分屏上有什么区别
/**
 * 获取窗口的可绘制区域大小，单位像素。
 * @param {SdlWindow_t} window 指定窗口
 * @return {w: number, h: number}
 */
function glGetDrawableSize(window) {
    let w = ref.alloc('int', 0);
    let h = ref.alloc('int', 0);
    lib.SDL_GL_GetDrawableSize(window, w, h);
    return {
        w: ref.deref(w),
        h: ref.deref(h)
    };
}
exports.glGetDrawableSize = glGetDrawableSize;
/**
 * 根据名字获取 openGL 函数。
 * @param {any} creator ffi.Function 生成的对象， 用来生成 js 函数。
 * @param {string} func 要获取的 openGL 函数名称
 * @return 转换后的 js 函数。
 */
function glGetProcAddress(creator, func) {
    return creator.toFunction(lib.SDL_GL_GetProcAddress(func));
}
exports.glGetProcAddress = glGetProcAddress;
/**
 * 获取当前 gl context 的交换间隔。
 * @return 0 表示未开启垂直同步。
 *         1 表示开启了垂直同步。
 *        -1 if late swaps happen immediately instead of waiting for the next retrace;
 *        调用 getError 获取更多信息。
 */
function glGetSwapInterval() {
    return lib.SDL_GL_GetSwapInterval();
}
exports.glGetSwapInterval = glGetSwapInterval;
/**
 * 动态加载 openGL 库， 之后可以调用 glGetProcAddress 获取 openGL 函数。 此函数必须在初始化 InitOption.SDL_INIT_VIDEO 之后，
 * 创建 openGL 窗口之前调用。
 * @param {string} path 平台相关的 openGL 库名称，或者不传参数加载默认的库。
 * @return 0 表示操作成功。
 *         负值 代表错误代码， 调用 getError 获取更多信息。
 */
function glLoadLibrary(path) {
    return lib.SDL_GL_LoadLibrary(path);
}
exports.glLoadLibrary = glLoadLibrary;
/**
 * 为相应的窗口设置 openGL context。
 * @param {window} 与 context 参数相关联的窗口。
 *        {context} 与 window 参数相关联的 openGL context。
 * @return 0 表示成功
 *        负值 代表错误代码， 调用 getError 获取更多信息。
 */
function glMakeCurrent(window, context) {
    return lib.SDL_GL_MakeCurrent(window, context);
}
exports.glMakeCurrent = glMakeCurrent;
/**
 * 重置 opengl context 的所有属性为其默认值。
 */
function glResetArrtibutes() {
    lib.SDL_GL_ResetAttributes();
}
exports.glResetArrtibutes = glResetArrtibutes;
/**
 * 设置交换缓冲区的间隔。
 * @param {number} interval 0 立即刷新；
 *                   1 垂直同步；
 *                  -1 Some systems allow specifying -1 for the interval, to enable late swap tearing. Late swap
 *                     tearing works the same as vsync, but if you've already missed the vertical retrace for a
 *                     given frame, it swaps buffers immediately, which might be less jarring for the user during
 *                     occasional framerate drops. If application requests late swap tearing and the system does
 *                     not support it, this function will fail and return -1. In such a case, you should probably
 *                     retry the call with 1 for the interval.
 * @return 0 操作成功
 *         -1 参数值错误， 调用 getError 获取更多信息。
 */
function glSetSwapInterval(interval) {
    return lib.SDL_GL_SetSwapInterval(interval);
}
exports.glSetSwapInterval = glSetSwapInterval;
/**
 * 刷新使用 opengl 渲染的窗口。
 * @param {SdlWindow_t} window 要刷新的窗口
 */
function glSwapWindow(window) {
    lib.SDL_GL_SwapWindow(window);
}
exports.glSwapWindow = glSwapWindow;
/**
 * 卸载之前由 glLoadLibrary 函数装载的 opengl 库， 在 glGetProcAddress 完成后即可调用这个函数。
 */
function glUnloadLibrary() {
    lib.SDL_GL_UnloadLibrary();
}
exports.glUnloadLibrary = glUnloadLibrary;
/**
 * 根据给定的 DisplayMode 返回与其值最接近的一种。(DisplayMode 应该是只有固定几种，与设备有关)
 * @param {number} displayIndex 显示设备序号。
 * @param {DisplayMode_t} desired 期望值。
 * @return 成功时返回与期望值最接近的模式；失败则返回 null，调用 getError 获取更多信息。
 */
function getClosestDisplayMode(displayIndex, desired) {
    desired.driverdata = ref.alloc('int', 0);
    let desired_p = struct_1.DisplayMode_c(desired).ref();
    let result_p = (new struct_1.DisplayMode_c).ref();
    let ret = lib.SDL_GetClosestDisplayMode(displayIndex, desired_p, result_p);
    if (buffer_util_1.nullOrSelf(ret) === null) {
        console_1.error(sdl_error_1.getError());
        return null;
    }
    let result = ref.deref(result_p);
    return {
        format: result.format,
        w: result.w,
        h: result.h,
        refresh_rate: result.refresh_rate,
        driverdata: result.driverdata
    };
}
exports.getClosestDisplayMode = getClosestDisplayMode;
/**
 * 获取当前显示模式信息。
 * @param {number} displayIndex 显示设备序号
 * @return 成功时返回显示模式对象；失败则返回 null，调用 getError 获取更多信息。
 */
function getCurrentClosestDisplayMode(displayIndex) {
    let result_p = (new struct_1.DisplayMode_c).ref();
    let ret = lib.SDL_GetCurrentDisplayMode(displayIndex, result_p);
    if (buffer_util_1.nullOrSelf(ret) === null) {
        console_1.error(sdl_error_1.getError());
        return null;
    }
    let result = ref.deref(result_p);
    return {
        format: result.format,
        w: result.w,
        h: result.h,
        refresh_rate: result.refresh_rate,
        driverdata: result.driverdata
    };
}
exports.getCurrentClosestDisplayMode = getCurrentClosestDisplayMode;
/**
 * 获取当前显卡驱动程序名称。
 */
function getCurrentVideoDriver() {
    return lib.SDL_GetCurrentVideoDriver();
}
exports.getCurrentVideoDriver = getCurrentVideoDriver;
/**
 * 获取桌面显示模式。
 * @param {number} displayIndex 显示设备序号
 * @return 成功时返回显示模式对象；失败则返回 null，调用 getError 获取更多信息。
 */
function getDesktopDisplayMode(displayIndex) {
    let result_p = (new struct_1.DisplayMode_c).ref();
    let ret = lib.SDL_GetDesktopDisplayMode(displayIndex, result_p);
    if (ret < 0) {
        console_1.error(sdl_error_1.getError());
        return null;
    }
    let result = ref.deref(result_p);
    return {
        format: result.format,
        w: result.w,
        h: result.h,
        refresh_rate: result.refresh_rate,
        driverdata: result.driverdata
    };
}
exports.getDesktopDisplayMode = getDesktopDisplayMode;
/**
 * 获取当前 gl 上下文中指定属性的实际值。
 * @param {GLAttr} attr 要查询的 GLAttr 属性。
 * @return 要查询属性的值。
 */
function glGetAttribute(attr) {
    // todo 是否必须用这种形式传指针
    let ret = ref.alloc('int');
    let res = lib.SDL_GL_GetAttribute(attr, ret);
    if (res < 0) {
        console_1.error(sdl_error_1.getError());
        return res;
    }
    return ref.deref(ret);
}
exports.glGetAttribute = glGetAttribute;
/**
 * 返回显示设备的像素尺寸。
 * @param {number} displayIndex 显示设备序号
 * @return 表示显示设备尺寸的矩形， 如果出错返回 null
 */
function getDisplayBounds(displayIndex) {
    let rect_p = new rect_1.Rect_c(rect_1.EMPTY_RECT).ref(), rect = ref.deref(rect_p);
    let result = lib.SDL_GetDisplayBounds(displayIndex, rect_p);
    if (result < 0) {
        console_1.error(sdl_error_1.getError());
        return null;
    }
    return {
        x: rect.x,
        y: rect.y,
        w: rect.w,
        h: rect.h
    };
}
exports.getDisplayBounds = getDisplayBounds;
// todo error
function getDisplayDPI(displayIndex) {
    let ddpi = ref.alloc('float', 0), hdpi = ref.alloc('float', 0), vdpi = ref.alloc('float', 0), result = lib.SDL_GetDisplayDPI(displayIndex, ddpi, hdpi, vdpi);
    if (result < 0) {
        console_1.error(sdl_error_1.getError());
        return null;
    }
    return {
        ddpi: ref.deref(ddpi),
        hdpi: ref.deref(hdpi),
        vdpi: ref.deref(vdpi)
    };
}
exports.getDisplayDPI = getDisplayDPI;
/**
 * Use this function to get information about a specific display mode.
 * @param {number} displayIndex the index of the display to query
 * @param {number} modeIndex the index of the display mode to query
 * @return {DisplayMode_t}
 */
function getDisplayMode(displayIndex, modeIndex) {
    let displayMode, display_p, result;
    display_p = new struct_1.DisplayMode_c().ref();
    result = lib.SDL_GetDisplayMode(displayIndex, modeIndex, display_p);
    if (result < 0) {
        console_1.error(sdl_error_1.getError());
        return null;
    }
    displayMode = ref.deref(display_p);
    return {
        format: displayMode.format,
        w: displayMode.w,
        h: displayMode.h,
        refresh_rate: displayMode.refresh_rate,
        driverdata: displayMode.driverdata
    };
}
exports.getDisplayMode = getDisplayMode;
/**
 * Use this function to get the name of a display in UTF-8 encoding.
 * @param {number} displayIndex the index of display from which the name should be queried
 * @return Returns the name of a display or NULL for an invalid display index or failure;
 */
function getDisplayName(displayIndex) {
    let result;
    result = lib.SDL_GetDisplayName(displayIndex);
    if (result.length === 0) {
        console_1.error(sdl_error_1.getError());
        return null;
    }
    return ref.readCString(result);
}
exports.getDisplayName = getDisplayName;
/**
 * Use this function to get the usable desktop area represented by a display, with the primary display located at 0,0.
 * @param {number} displayIndex the index of the display to query the usable bounds from
 * @return {Rect_t} the SDL_Rect structure filled in with the display bounds
 */
/* export function getDisplayUsableBounds(displayIndex: number): Rect_t {
  let result, rect, rect_p = new Rect_c().ref();
  result = lib.SDL_GetDisplayUsableBounds(displayIndex, rect_p);
  if (result < 0) {
    error(getError());
    return null;
  }
  rect = ref.deref(rect_p);
  return {
    x: rect.x,
    y: rect.y,
    w: rect.w,
    h: rect.h
  }
} */
/**
 * Use this function to get the window that currently has an input grab enabled.
 */
function getGrabbedWindow() {
    return lib.SDL_GetGrabbedWindow();
}
exports.getGrabbedWindow = getGrabbedWindow;
/**
 * Use this function to get the number of available display modes.
 * @param {number} displayIndex the index of the display to query.
 */
function getNumDisplayModes(displayIndex) {
    return lib.SDL_GetNumDisplayModes(displayIndex);
}
exports.getNumDisplayModes = getNumDisplayModes;
/**
 * Use this function to get the number of available video displays.
 * @return Returns a number >= 1 or a negative error code on failure;
 */
function getNumVideoDisplays() {
    let result = lib.SDL_GetNumVideoDisplays();
    if (result < 1) {
        console_1.error(sdl_error_1.getError());
    }
    return result;
}
exports.getNumVideoDisplays = getNumVideoDisplays;
/**
 * Use this function to get the number of video drivers compiled into SDL.
 * @return Returns a number >= 1 on success or a negative error code on failure;
 */
function getNumVideoDrivers() {
    let result = lib.SDL_GetNumVideoDrivers();
    if (result < 1) {
        console_1.error(sdl_error_1.getError());
    }
    return result;
}
exports.getNumVideoDrivers = getNumVideoDrivers;
/**
 * Use this function to get the name of a built in video driver.
 * @param {number} driverIndex the index of a video driver
 * @return Returns the name of the video driver with the given index.
 */
function getVideoDriver(driverIndex) {
    let result = lib.SDL_GetVideoDriver(driverIndex);
    if (result.length === 0) {
        return null;
    }
    return ref.readCString(result);
}
exports.getVideoDriver = getVideoDriver;
function getWindowBordersSize(window) {
    let top, left, bottom, right;
    top = ref.alloc('int', 0);
    left = ref.alloc('int', 0);
    bottom = ref.alloc('int', 0);
    right = ref.alloc('int', 0);
    let result = lib.SDL_GetWindowBordersSize(window, top, left, bottom, right);
    if (result < 0) {
        console_1.error(sdl_error_1.getError());
    }
}
exports.getWindowBordersSize = getWindowBordersSize;
/**
 * 设置 OpenGL 窗口的属性， 必须在创建窗口之前调用。
 * @param {GLAttr} attr 要设置的属性。
 * @param {number} value 要设置的属性值。
 *
 */
function glSetAttribute(attr, value) {
    let res = lib.SDL_GL_SetAttribute(attr, value);
    if (res < 0) {
        console_1.error(sdl_error_1.getError());
    }
    return res;
}
exports.glSetAttribute = glSetAttribute;
//# sourceMappingURL=methods.js.map