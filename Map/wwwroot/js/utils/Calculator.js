function CalculateNewCoordinates(x, y, sgnX = 1, sgnY = 1, zoom) {
    var xOffset = XOffset;
    var yOffset = YOffset;

    return [y + sgnX * yOffset, x + sgnY * xOffset];
}