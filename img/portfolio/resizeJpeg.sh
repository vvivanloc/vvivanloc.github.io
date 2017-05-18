#https://www.smashingmagazine.com/2015/06/efficient-image-resizing-with-imagemagick/
mogrify -filter Triangle -background white -alpha remove -alpha off -flatten -define filter:support=2 -resize x$2 -format jpg $1/*.png -unsharp 0.25x0.08+8.3+0.045 -dither None -posterize 136 -quality 82 -define jpeg:fancy-upsampling=off -interlace line -colorspace sRGB 

