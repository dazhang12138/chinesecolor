/**
 * 根据RGB颜色排序
 * @param rgb
 * @returns {[number, number, number]}
 */
export const rgb2hsv = function (rgb) {
    const r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, v = max;
    const d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max === min) {
        h = 0;
    } else {
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return [h, s, v];
};
/**
 * 设置画布显示
 * @param cmyk
 * @param rgb
 * @param index
 */
export const drawArcAndLine = (cmyk,rgb,index) => {
    const canvas = document.getElementById('canvas_'+index),
        context = canvas.getContext('2d'),
        lineHeight = 278 - 150;

    canvas.width = 50;
    canvas.height = 278;
    cmyk.forEach(function (v, i) {
        let ctx = canvas.getContext('2d'),
            endAngle = (-90 + (360 * v / 100)) * (Math.PI / 180);

        if (v === 0) endAngle = 1.5 * Math.PI;
        ctx.beginPath();
        ctx.arc(14,31.3 * (i+1),9,1.5 * Math.PI, endAngle);
        ctx.lineWidth = 6;
        context.strokeStyle = 'white';
        ctx.stroke();
    });
    context.lineWidth = 1;
    context.moveTo(18,150);
    context.lineTo(18,150 + lineHeight * (rgb[0]/255))
    context.moveTo(21,150);
    context.lineTo(21,150 + lineHeight * (rgb[1]/255))
    context.moveTo(24,150);
    context.lineTo(24,150 + lineHeight * (rgb[2]/255))
    context.stroke();
};
