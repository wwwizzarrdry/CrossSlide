CrossSlide
A jQuery plugin to create pan and cross-fade animations
Project page – Download minified – Download source – Bugs, feature requests and support

CrossSlide is a jQuery plugin implementing in 2kB1 of Javascript code some common slide-show animations, traditionally only available via Adobe Flash™ or other proprietary plugins. CrossSlide builds upon jQuery's animation facility, so it is as portable across browsers as jQuery itself (that is, a lot!)

Internally CrossSlide does not rely on lookup tables, building instead a "chain" of functions. Each function starts a linear phase of the animation through jQuery, setting the next function in the chain as a complete callback. After all the functions are prepared and the animation is started, no other calculations are made. This setup reduces runtime overhead to the absolute minimum, making CrossSlide the most optimized implementation of these effects.

CrossSlide can create a few different effects, depending on how it's called.

Static cross-fade

The simplest effect, a cross-fade between static pictures is just as simple to set up:

$('#placeholder').crossSlide({
  sleep: 2,
  fade: 1
}, [
  { src: 'sand-castle.jpeg' },
  { src: 'sunflower.jpeg'   },
  { src: 'flip-flops.jpeg'  },
  { src: 'rubber-ring.jpeg' }
]);
#placeholder is the block-level element (such as a div) whose contents will be replaced with the animation. What you put inside it in your HTML is only shown while the images are being preloaded, or if the user-agent has JavaScript turned off. The current version of CrossSlide waits until all the images are preloaded before starting the slideshow, so I usually put the first image as a background-image of the div, so that users with a slow connection won't see a big hole in the website while all the images are being loaded.

The first parameter to the crossSlide() function call is a dictionary of options. The second parameter is an array of objects, defining the sequence of pictures, each with its source path and various attributes.

To get the static cross-fade effect you must specify the sleep option, which is the time every image will take on its own, and the fade option, which is the duration of each cross-fade animation between images. Both are expressed in seconds and can accept decimal values.

Slide and cross-fade
This is the kind of animation from which the plugin takes its name. It shows a sequence of pictures moving at a constant speed in alternating directions, with a cross-fade effect between any two pictures.


Here is the jQuery code to set it up:

$('#placeholder').crossSlide({
  speed: 45,
  fade: 1
}, [
  { src: 'sand-castle.jpeg', dir: 'up'   },
  { src: 'sunflower.jpeg',   dir: 'down' },
  { src: 'flip-flops.jpeg',  dir: 'up'   },
  { src: 'rubber-ring.jpeg', dir: 'down' }
]);
Notice how the speed parameter, expressed in pixels/second, has taken the place of sleep, as the images aren't static anymore, but move with constant speed. fade is still required and still expressed in seconds. You cannot use both speed and sleep at the same time, because they trigger different effects.

Additionally you have to specify the direction in which each image should be moving. The plugin computes the rest, panning each image edge-to-egde at the desired speed, in the desired direction. dir must be one of up, down, left or right. For best results I recommend using an even number of pictures and alternating directions, as in the example.

Ken Burns effect
Finally, CrossSlide can be brought up to the full visual power of a so-called Ken Burns effect: panning, zooming and fading each image to specific points, to guide the eye of the viewer and convey meaning:

Freeze
Stop
Restart

Pause
Resume
Sunflower
Sunflower
In this case the jQuery code is a bit more complex, because it shows a number of features:

$('#placeholder').crossSlide({
  fade: 1
}, [
  {
    src:  'sand-castle.jpeg',
    alt:  'Sand Castle',
    from: '100% 80% 1x',
    to:   '100% 0% 1.7x',
    time: 3
  }, {
    src:  'sunflower.jpeg',
    alt:  'Sunflower',
    from: 'top left',
    to:   'bottom right 1.5x',
    time: 2
  }, {
    src:  'flip-flops.jpeg',
    alt:  'Flip Flops',
    from: '100% 80% 1.5x',
    to:   '80% 0% 1.1x',
    time: 2
  }, {
    src:  'rubber-ring.jpeg',
    alt:  'Rubber Ring',
    from: '100% 50%',
    to:   '30% 50% 1.5x',
    time: 2
  }
], function(idx, img, idxOut, imgOut) {
  if (idxOut == undefined)
  {
    // starting single image phase, put up caption
    $('div.caption').text(img.alt).animate({ opacity: .7 })
  }
  else
  {
    // starting cross-fade phase, take out caption
    $('div.caption').fadeOut()
  }
});
Every picture's pan & zoom effect will last for time seconds plus the two cross-fades, each taking an additional fade seconds. from and to define the starting and ending points of the effect, including the cross-fade part. They are expressed as a background-position value, following the syntax of the CSS property of the same name, plus an optional zoom factor. The zoom defaults to 1x if not provided. The background-position part only accepts keywords and percent values, lengths are not supported. As in CSS, the percentages are interpreted as horizontal followed by vertical, while the keywords can be put in any order.

Every picture can be made a hyperlink, by adding a href parameter with a relative or absolute URI to the option dictionary of the single picture. You can also add an onclick parameter, pointing to a function that will handle click events; alt to supply the alternate text; and target to specify the target frame.

Other options you can put in the global dictionary are: loop (numeric) to have the animation loop just once, or a fixed number of times, and then stop; shuffle (boolean) to have CrossSlide automatically shuffle the images before starting the slideshow; and doubleFade (boolean) to have both a fade-out and a fade-in effect when switching images (this is useful with transparent images.)

As shown in this example, CrossSlide accepts a callback function as a third argument. This callback will be invoked at every keyframe, meaning when an image starts to be cross-faded with another, and when the cross-fade ends and a single image remains on screen. The callback will be passed either 2 or 4 arguments, depending on the phase of the animation. If we are at the beginning of a single image-phase, the callback will be passed 2 arguments: the index of the image in the array and the <img> object currently being animated. If we are at the beginning of a cross-fade, the callback will be passed 4 arguments: index and img element of the incoming image, plus index and img element of the outgoing image. You can see how the example exploits this fact to show a nice textual caption.

In case you're misunderstanding the above, I need to make clear that the callback system is a programmer's tool and it can be used for much more than captions. Still, if you can't write Javascript code, don't expect to be able to make it work!

Finally, there are 5 methods you can invoke at runtime on the same object you invoked crossSlide() on, to control the animation. The first 3 use jQuery standard functions. The pause and resume methods, on the other hand, require an extension to jQuery's animation facility, in the form of my own jQuery Pause plugin.

crossSlideFreeze() will freeze the slideshow, using jQuery's stop() method, leaving the images in the position they where when you called it.
crossSlideStop() will stop the slideshow and empty the container div; if the container was assigned a static background image or color by css, it will show through.
crossSlideRestart() will stop the slideshow, if needed, and restart it from the beginning.
crossSlidePause() will pause the slideshow.
crossSlideResume() will resume a paused slideshow.
Ken Burns variant
At the request of some users, here is a variant of the Ken Burns effect that does away with the cross-fade between moving images, which is the phase most demanding on the browser's rendering engine:


This effect is turned on with the variant option. To get a pleasing effect in this variant, a linear animation is not appropriate for the single-image phase, so CrossSlide defaults to jQuery's built-in swing mode. You can choose a different easing effect with the easing option, which will be applied to single-image phases only: cross-fade phases are still rendered with a linear animation. In this example I'm using easeInOutQuad from George McGinley Smith's jQuery Easing Plugin.

$('#placeholder').crossSlide({
  fade: 1,
  variant: true,
  easing: 'easeInOutQuad'
}, [
  // as above
]);
Performance
jQuery animation effects rely on the browser for positioning, scaling and cropping images, through CSS and the DOM. Thus it depends heavily on how the browser and the underlying graphics platform optimize these operations. Compared to native implementations of the same effects, CrossSlide is quite CPU-intensive, but recent hardware handles a moderate usage without problems.

Some browsers on some platforms apply a nice anti-alias filter to images when you use a zoom factor in the Ken Burns mode, but most don't. Therefore I recommend keeping your zoom factors below 1x, in order to avoid ugly 'pixel mosaic' effects. You can tell that I didn't follow my own advice in this very site by the ugly pixel noise in the Ken Burns examples above.

It also bears to mention that CSS and DOM force a script to round position and size of images to integer pixel values, for every frame of an animation, not just keyframes. This effectively makes it impossible to achieve slow, smooth animations. If you are experiencing this issue, my only advice is to either make the animation faster, do away with diagonal panning and/or image zooming, or switch to a different animation technology.

How to use it
Here is a simple guide on how to put CrossSlide on a website:

Download the jQuery library and include it along with my plugin in the head section of your website:

<script src="jquery.min.js"></script>
<script src="jquery.cross-slide.min.js"></script>
Put a block element somewhere in your page and give it an id:

<div id="slideshow"></div>
Make sure the element has a fixed size, even when emptied of its contents, by setting its width and height in the CSS stylesheet:

#slideshow {
  width: 600px;
  height: 200px;
}
Open a script tag, define a "document ready handler" and activate my plugin on the div you created in step 2:

<script>
  $(function() {
    $('#slideshow').crossSlide({
      sleep: 2,
      fade: 1
    }, [
      { src: 'picture1.jpg' },
      { src: 'picture2.jpg' },
      { src: 'picture3.jpg' },
      { src: 'picture4.jpg' }
    ])
  });
</script>

Things to keep in mind:

Keep an eye on the Error console (in Firefox it's under the Tools menu) as that's where my script will post any error messages you are supposed to read, for example when the options you use don't make sense together.

Make sure the browser can find the images you reference in the src attributes, relative to the path of the current page, because if the browser cannot load them, my plugin has no way to know and will just hangs there, without any error messages.

Don't put a comma after the last element in an array or object (this means don't put a comma just before a closing brace or bracket, even if it's on the previous line) because Internet Explorer won't like it and will refuse to run the script, again without any error message.

Don't call crossSlide() on an empty set or on a set of more than one element. This is not supported and will raise an exception—as you can see clearly if you are keeping an eye on the Error Console.

1: minified and gzipped, code only.

Credits go to spacetrucker, hichako, jayniebell, and ruminatrix for the nice summer pictures.
