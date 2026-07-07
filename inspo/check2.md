All Posts
Creative Hub
Webzibition
Search on Codrops...
By Manoela Ilic in Playground on March 31, 2020
CSS-Only Marquee Effect
A simple CSS-only marquee effect for a menu based on Francesco Zagami’s Dribbble shot.

CSS Only
hover
marquee
menu
typography

Marquee_featured
Demo
Code
Ready to become a GSAP expert? Access the world’s most comprehensive GSAP training with 300+ lessons. Enroll now →

Some time ago I encountered this great Dribbble shot by Francesco Zagami. It has a really nice marquee animation when hovering a menu item (you have to wait a couple of seconds to see the menu).

I really love this effect and I have seen it in more designs recently. So I wanted to try and implement it using CSS only, without any JavaScript, and share it with you. After some searching, I found an interesting solution on StackOverflow by Fabrizio Calderan and one by Alvin Kobie on Codepen.

In the meantime, Fabrizio showed another really brilliant solution that does not require the repeated spans, but that uses text shadows. Have a look at it here: https://codepen.io/fcalderan/pen/GRJeYOL

Tiny break: Want to get website inspiration? Check out our Webzibition and see whats trending.

For this demo, I needed to adjust the styles a bit to create the exact effect seen in Francesco’s Dribbble shot, like offsetting the marquee text and fading it in on hover. The marquee requires text repetition so that the illusion works. The main idea is to animate the marquee infinitely, restarting it seamlessly.

For that we can use the following markup:

<div class="marquee">
	<div class="marquee__inner" aria-hidden="true">
		<span>Showreel</span>
		<span>Showreel</span>
		<span>Showreel</span>
		<span>Showreel</span>
	</div>
</div>
… and these styles:

.marquee {
    position: relative;
    overflow: hidden;
    --offset: 20vw;
    --move-initial: calc(-25% + var(--offset));
    --move-final: calc(-50% + var(--offset));
}

.marquee__inner {
    width: fit-content;
    display: flex;
    position: relative;
    transform: translate3d(var(--move-initial), 0, 0);
    animation: marquee 5s linear infinite;
    animation-play-state: paused;
}

.marquee span {
    font-size: 10vw;
    padding: 0 2vw;
}

.marquee:hover .marquee__inner {
    animation-play-state: running;
}

@keyframes marquee {
    0% {
        transform: translate3d(var(--move-initial), 0, 0);
    }

    100% {
        transform: translate3d(var(--move-final), 0, 0);
    }
}
For the marquee to have an offset (i.e. we want to show the first item, cut off at the beginning), it basically needs to be pulled back. So let’s use four repeated items, like this:


The amount that we want the items to be pulled back is defined in the variable --move-initial. So -25% makes it move back the exact length of one item (as we have four in total).


And the --offset lets us adjust this a bit, so that we see some of the text. --move-final is the end position of the animation, where we can seamlessly start a new loop. It’s half of the way (two items now), again with one item on the left being cut off the same amount like in the initial position. By setting an adequate font size (in vw), we can make sure that three repetitions are visible in the viewport. This is important for the “illusion” to work (i.e. start the next loop).

For the demo, I’ve added some more transitions and images with a blend mode. Have a look at the code if you’d like to see how that all works together.

I really hope you like this demo and find it useful!

Credits
Images by Frankie Cordoba AKA Foulster
Font used: Sofia Pro
The grainy background noise animation is by Geoff Graham
CSS Only
hover
marquee
menu
typography


Manoela Ilic
Editor-in-Chief at Codrops. Designer, developer, and dreamer — sharing web inspiration with millions since 2009. Bringing together 20+ years of code, creativity, and community.

Website
X
LinkedIn
Creative Spotlights
Inside the journeys and portfolios of today's most inspiring designers and developers.













Studio Stories
Discover how studios & agencies started, how they work, and what they've built.







Read their stories
Case Studies
Discover the ideas, design, and craft behind today’s most inspiring web experiences.

View all Case Studies
Learn with Tutorials
Level up your front-end skills with practical, step-by-step tutorials.

View all Tutorials
Creative Hub
A growing showcase of Codrops originals and hand-picked demos from the creative web.


HTML marquee provides a standard way of creating scroll texts, slide-in, and bouncy texts, as well as images on your web page. In this chapter, you will learn about the marquee, but the implementation will be done with CSS.

Marquee is an animation effect for web pages used to create horizontal or vertical scrolling text and images. The <marquee> element of HTML is not a standard-compliant, ie the element is not part of the W3 HTML specifications.

For creating a marquee using CSS, you have to use the CSS animation property together with the @keyframes rule. Let us now see its variations with implementation.

Here you have to implement translateX() for determining the position of the text at the beginning or end of the animation. Your text will then move among these two assigned points as the animation progresses.


<!DOCTYPE html>
<html>

    <head>
        <style>
            .marquee {
                height: 50px;
                overflow: hidden;
                position: relative;
                background: #fefefe;
                color: #333;
                border: 1px solid #4a4a4a;
            }
            
            .marquee p {
                position: absolute;
                width: 100%;
                height: 100%;
                margin: 0;
                line-height: 50px;
                text-align: center;
                -moz-transform: translateX(100%);
                -webkit-transform: translateX(100%);
                transform: translateX(100%);
                -moz-animation: scroll-left 2s linear infinite;
                -webkit-animation: scroll-left 2s linear infinite;
                animation: scroll-left 20s linear infinite;
            }
            
            @-moz-keyframes scroll-left {
                0% {
                    -moz-transform: translateX(100%);
                }
                100% {
                    -moz-transform: translateX(-100%);
                }
            }
            
            @-webkit-keyframes scroll-left {
                0% {
                    -webkit-transform: translateX(100%);
                }
                100% {
                    -webkit-transform: translateX(-100%);
                }
            }
            
            @keyframes scroll-left {
                0% {
                    -moz-transform: translateX(100%);
                    -webkit-transform: translateX(100%);
                    transform: translateX(100%);
                }
                100% {
                    -moz-transform: translateX(-100%);
                    -webkit-transform: translateX(-100%);
                    transform: translateX(-100%);
                }
            }
        </style>
    </head>

    <body>
        <div class="marquee">
            <p> Marquee in CSS </p>
        </div>
    </body>

</html>
For making a scrolling image or animated content for your page, you have to replace your text (from the previous example) simply with any image of your choice. In addition, you have to make use of the <div> element and as a nested tag put the <img> tag within the <div>.

This animation feature of the marquee will bounce back once it reaches the end (left or right) of your page.


<!DOCTYPE html>
<html>

    <head>
        <style>
            .bounce {
                height: 50px;
                overflow: hidden;
                position: relative;
                background: #fefefe;
                color: #333;
                border: 1px solid #4a4a4a;
            }
            
            .bounce p {
                position: absolute;
                width: 100%;
                height: 100%;
                margin: 0;
                line-height: 50px;
                text-align: center;
                -moz-transform: translateX(50%);
                -webkit-transform: translateX(50%);
                transform: translateX(50%);
                -moz-animation: bouncing-text 5s linear infinite alternate;
                -webkit-animation: bouncing-text 5s linear infinite alternate;
                animation: bouncing-text 10s linear infinite alternate;
            }
            
            @-moz-keyframes bouncing-text {
                0% {
                    -moz-transform: translateX(50%);
                }
                100% {
                    -moz-transform: translateX(-50%);
                }
            }
            
            @-webkit-keyframes bouncing-text {
                0% {
                    -webkit-transform: translateX(50%);
                }
                100% {
                    -webkit-transform: translateX(-50%);
                }
            }
            
            @keyframes bouncing-text {
                0% {
                    -moz-transform: translateX(50%);
                    -webkit-transform: translateX(50%);
                    transform: translateX(50%);
                }
                100% {
                    -moz-transform: translateX(-50%);
                    -webkit-transform: translateX(-50%);
                    transform: translateX(-50%);
                }
            }
        </style>
    </head>

    <body>
        <div class="bounce">
            <p> Bouncy Marquee </p>
        </div>
    </body>

</html>
Found This Page Useful? Share It!
Get the Latest Tutorials and Updates
 
© 2009 — 2026 W3schools® of Technology.
About UsSupport UsContact UsCopyrightPrivacy Policy


← Back to Master.dev
Courses
Learn
Become a Member
Guest Writing
RSS
/ BLOG

Animation
Carousels
CSS
sibling-index()
slider
Infinite Marquee Animation using Modern CSS
Temani Afif
Temani Afif
on
August 4, 2025
A set of logos with an infinite repeating slide animation is a classic component in web development. We can find countless examples and implementations starting from the old (and now deprecated) <marquee> element. I’ve written an article about it myself a few years ago.

“Why another article?” you ask. CSS keeps evolving with new and powerful features, so I always try to find room for improvement and optimization. We’ll do that now with some new CSS features.

At the time of writing, only Chrome-based browsers have the full support of the features we will be using, which include features like shape(), sibling-index(), and sibling-count().


In the demo above, we have an infinite marquee animation that works with any number of images. Simply add as many elements as you want in the HTML. There is no need to touch the CSS. You can easily control the number of visible images by adjusting one variable, and it’s responsive. Resize the screen and see how things adjust smoothly.

You might think the code is lengthy and full of complex calculations, but it’s less than 10 lines of CSS with no JavaScript.


.container {
  --s: 150px; /* size of the images */
  --d: 8s; /* animation duration */
  --n: 4; /* number of visible images */
  
  display: flex;
  overflow: hidden;
}
img {
  width: var(--s);
  offset: shape(from calc(var(--s)/-2) 50%,hline by calc(sibling-count()*max(100%/var(--n),var(--s))));
  animation: x var(--d) linear infinite calc(-1*sibling-index()*var(--d)/sibling-count());
}
@keyframes x { 
  to { offset-distance: 100%; }
}
 CSS 
Perhaps this looks complex at first glance, especially that strange offset property! Don’t stare too much at it; we will dissect it together, and by the end of the article, it will look quite easy.

The Idea
The tricky part when creating a marquee is to have that cyclic animation where each element needs to “jump” to the beginning to slide again. Earlier implementations will duplicate the elements to simulate the infinite animation, but that’s not a good approach as it requires you to manipulate the HTML, and you may have accessibility/performance issues.

Some modern implementations rely on a complex translate animation to create the “jump” of the element outside the visible area (the user doesn’t see it) while having a continuous movement inside the visible area. This approach is perfect but requires some complex calculation and may depend on the number of elements you have in your HTML.

It would be perfect if we could have a native way to create a continuous animation with the “jump” and, at the same time, make it work with any number of elements. The first part is doable and we don’t need modern CSS for it. We can use offset combined with path() where the path will be a straight line.


Inside path, I am using the SVG syntax to define a line, and I simply move the image along that line by animating offset-distance between 0% and 100%. This looks perfect at first glance since we have the animation we want but it’s not a flexible approach because path() accepts only hard-coded pixel values.

To overcome the limitation of path(), we are going to use the new shape() function! Here is a quote from the specification:

The shape() function uses a set of commands roughly equivalent to the ones used by path(), but does so with more standard CSS syntax, and allows the full range of CSS functionality, such as additional units and math functions … In that sense, shape() is a superset of path().

Instead of drawing a line using path(), we are going to use shape() to have the ability to rely on CSS and control the line based on the number of elements.

Here is the previous demo using shape():


If you are unfamiliar with shape(), don’t worry. Our use case is pretty basic as we are going to simply draw a horizontal line using the following syntax:

offset: shape(from X Y, hline by length);
The goal is to find the X Y values (the coordinates of the starting point) and the length value (the length of the line).

The Implementation
Let’s start with the HTML structure, which is a set of images inside a container:


<div class="container">
  <img src="">
  <img src="">
  <!-- as many images as you want -->
</div>
  
We make the container flexbox to remove the default space between the image and make sure they don’t wrap even if the container is smaller (remember that flex-wrap is by default nowrap).


Now, let’s suppose we want to see only N images at a time. For this, we need to define the width of the container to be equal to N x size_of_image.


.container {
  --s: 100px; /* size of the image */
  --n: 4; /* number of visible images */

  display: flex;
  width: calc(var(--n) * var(--s));
  overflow: hidden;
}
img {
  width: var(--s);
}
 CSS 

Nothing complex so far. We introduced some variables to control the size and the number of visible images. Now let’s move to the animation.

To have a continuous animation, the length of the line needs to be equal to the total number of images multiplied by the size of one image. In other words, we should have a line that can contain all the images side by side. The offset property is defined on the image elements, and thanks to modern CSS, we can rely on the new sibling-count() to get the total number of images.


offset: shape(from X Y, hline by calc(sibling-count() * var(--s)));
 JavaScript 
What about the X Y values? Let’s try 0 0 and see what happens:


Hmm, not quite good. All the images are above each other, and their position is a bit off. The first issue is logical since they share the same animation. We will fix it later by introducing a delay.

The trickiest part when working with offset is defining the position. The property is applied on the child elements (the images in our case), but the reference is the parent container. By specifying 0 0, we are considering the top-left corner of the parent as the starting point of the line.

What about the images? How are they placed? If you remove the animation and keep the offset-distance equal to 0% (the default value), you will see the following.

An animated marquee with text that moves horizontally across a container, showcasing a modern CSS implementation for infinite scrolling images or text.
The center of the images is placed at the 0 0, and starting from there, they move horizontally until the end of the line. Let’s update the X Y values to rectify the position of the line and bring the images inside the container. For this, the line needs to be in the middle 0 50%.

offset: shape(from 0 50%, hline by calc(sibling-count() * var(--s)));

It’s better, and we can already see the continuous animation. It’s still not perfect because we can see the “jump” of the image on the left. We need to update the position of the line so it starts outside the container and we don’t see the “jump” of the images. The X value should be equal to -S/2 instead of 0.

offset: shape(from calc(var(--s)/-2) 50%, hline by calc(sibling-count() * var(--s)));

No more visible jump, the animation is perfect!

To fix the overlap between the images, we need to consider a different delay for each image. We can use nth-child() to select each image individually and define the delay following the logic below:


img:nth-child(1) {animation-delay: -1 *  duration/total_image }
img:nth-child(2) {animation-delay: -2 *  duration/total_image }
/* and so on */
 CSS 
Tedious work, right? And we need as many selectors as the number of images in the HTML code, which is not good. What we want is a generic CSS code that doesn’t depend on the HTML structure (the number of images).

Similar to the sibling-count()that gives us the total number of images, we also have sibling-index() that gives us the index of each image within the container. All we have to do is to update the animation property and include the delay using the index value that will be different for each image, hence a different delay for each image!


animation: 
  x var(--d) linear infinite 
  calc(-1*sibling-index()*var(--d)/sibling-count());
 CSS 

Everything is perfect! The final code is as follows:


.container {
  --s: 100px; /* size of the image */
  --d: 4s; /* animation duration */
  --n: 4; /* number of visible images */
  
  display: flex;
  width: calc(var(--n) * var(--s));
  overflow: hidden;
}
img {
  width: var(--s);
  offset: shape(from calc(var(--s)/-2) 50%, hline by calc(sibling-count() * var(--s)));
  animation: x var(--d) linear infinite calc(-1*sibling-index()*var(--d)/sibling-count());
}
@keyframes x { 
  to {offset-distance: 100%}
}
 CSS 
We barely have 10 lines of CSS with no hardcoded values or magic numbers!

Let’s Make it Responsive
In the previous example, we fixed the width of the container to accommodate the number of images we want to show but what about a responsive behavior where the container width is unknown? We want to show only N images at a time within a container that doesn’t have a fixed width.

The observation we can make is that if the container width is bigger than NxS, we will have space between images, which means that the line defined by shape() needs to be longer as it should contain the extra space. The goal is to find the new length of the line.

Having N images visible at a time means that we can express the width of the container as follows:

width = N x (image_size + space_around_image)
We know the size of the image and N (Defined by --s and --n), so the space will depend on the container width. The bigger the container is, the more space we have. That space needs to be included in the length of the line.

Instead of:

hline by calc(sibling-count() * var(--s))
We need to use:

hline by calc(sibling-count() * (var(--s) + space_around_image))
We use the formula of the container width and replace (var(--s) + space_around_image) with width / var(--n) and get the following:

hline by calc(sibling-count() * width / var(--n) )
Hmm, what about the width value? It’s unknown, so how do we find it?

The width is nothing but 100%! Remember that offset considers the parent container as the reference for its calculation so 100% is relative to the parent dimension. We are drawing a horizontal line thus 100% will resolve to the container width.

The new offset value will be equal to:

shape(from calc(var(--s)/-2) 50%, hline by calc(sibling-count() * 100% / var(--n)));
And our animation is now responsive.

Resize the container (or the screen) in the below demo and see the magic in play:


We have the responsive part but it’s still not perfect because if the container is too small, the images will overlap each other.

We can fix this by combining the new code with the previous one. The idea is to make sure the length of the line is at least equal to the total number of images multiplied by the size of one image. Remember, it’s the length that allows all the images to be contained within the line without overlap.

So we update the following part:

calc(sibling-count() * 100%/var(--n))
With:

max(sibling-count() * 100%/var(--n), sibling-count() * var(--s))
The first argument of max() is the responsive length, and the second one is the fixed length. If the first value is smaller than the second, we will use the latter and the images will not overlap.

We can still optimize the code a little as follows:

calc(sibling-count() * max(100%/var(--n),var(--s)))
We can also add a small amount to the fixed length that will play the role of the minimum gap between images and prevent them from touching each other:

calc(sibling-count() * max(100%/var(--n),var(--s) + 10px))
We are done! A fully responsive marquee animation using modern CSS.

Here is again the demo I shared at the beginning of the article with all the adjustments made:


Do you still see the code as a complex one? I hope not!

The use of min() or max() is not always intuitive, but I have a small tutorial that can help you identify which one to use.

More Examples
I used images to explain the technique, but we can easily extend it to any kind of content. The only requirement/limitation is to have equal-width items.

We can have some text animations:


Or more complex elements with image + text:


In both examples, I am using flex-shrink: 0 to avoid the default shrinking effect of the flex items when the container gets smaller. We didn’t have this issue with images as they won’t shrink past their defined size.

Conclusion
Some of you will probably never need a marquee animation, but it was a good opportunity to explore modern features that can be useful such as the shape() and the sibling-*() functions. Not to mention the use of CSS variables, calc(), max(), etc., which I still consider part of modern CSS even if they are more common.

Wanna learn CSS Animations deeply?
We have an incredible course on all things CSS animations and transitions from David Khourshid. Access 300+ courses with a Master.dev subscription and get 20% off today!

Personalized Learning
Industry-Leading Experts
24 Learning Paths
Live Interactive Workshops
20% Off
Start Learning Today →
6 responses to “Infinite Marquee Animation using Modern CSS”

Jakub
says:
August 6, 2025 at 11:15 am
Doesn’t work on mobile – iOS 26, Safari, Brave, Google app

Reply

Chris Coyier
says:
August 6, 2025 at 12:55 pm
Temani specifically says at the top: https://frontendmasters.com/blog/infinite-marquee-animation-using-modern-css/#:~:text=At%20the%20time%20of%20writing%2C%20only%20Chrome%2Dbased%20browsers

Reply

Tommy
says:
August 6, 2025 at 11:30 am
The marquees are not moving in Chrome on my phone, does this mean right now it’s limited to desktop Chrome?

Reply

Chris Coyier
says:
August 6, 2025 at 12:56 pm
Temani specifically says at the top: https://frontendmasters.com/blog/infinite-marquee-animation-using-modern-css/#:~:text=At%20the%20time%20of%20writing%2C%20only%20Chrome%2Dbased%20browsers

Your phone is probably an iPhone, and all browsers (booooooooo) on iPhone are Safari.

Reply

King777
says:
August 11, 2025 at 4:56 am
This is truly an exciting art! Thanks for the analysis and the illustrative example of using sibling-*() functions – the flexibility and dynamism is impressive!

Reply

Alex
says:
August 15, 2025 at 1:28 am
This code works fine only when slides are equal by width
If you want the width of slides to be dynamic, you need to use Javascript
And if you want to control speed of slides by some condition (e.g. mouse hover) you must use JS too
There is one of the solution. It’s quite bigger, but it works and you can easily customise it

    .slider {
      overflow-x: hidden;
    }

.slider-track {
  display: flex;
  align-items: center;
}

.slide {
  margin-right: 64px;
  flex-shrink: 0
}
  const initSlider = () =&gt; {
    const DEFAULT_SPEED = 2;

    const slider = document.querySelector(".slider");
    if (!slider) return;

    const wrapper = document.querySelector(".slider-track");

    wrapper.innerHTML += wrapper.innerHTML;

    let speed = DEFAULT_SPEED;
    let position = 0;

    slider.addEventListener("mouseenter", () =&gt; {
      speed = DEFAULT_SPEED / 2;
    });

    slider.addEventListener("mouseleave", () =&gt; {
      speed = DEFAULT_SPEED;
    });

    function animate() {
      position -= speed;

      if (Math.abs(position) &gt;= wrapper.scrollWidth / 2) {
        position = 0;
      }

      wrapper.style.transform = `translateX(${position}px)`;
      requestAnimationFrame(animate);
    }

    animate();
  }

  initSlider();
[EDITOR’s NOTE]: Use Markdown triple-backtick code blocks to post code here so it gets escaped properly. Or make a Pen: pen.new. I’m not sure the above code posted correctly.

Reply
Leave a Reply
Your email address will not be published. Required fields are marked *
Comment *

Name *

Email *

Website


Save my name, email, and website in this browser for the next time I comment.


Notify me of follow-up comments by email.


Notify me of new posts by email.


Table of Contents
The Idea
The Implementation
Let’s Make it Responsive
More Examples
Conclusion
Did you know?
Our courses go beyond frontend into fullstack, devops, and AI.

→ Explore courses (20% off)
$966,000
Master.dev donates to open source projects through thanks.dev and Open Collective, as well as donates to non-profits like The Last Mile, Annie Canons, and Vets Who Code.

Courses
Learn
Teachers
Guides
Blog
FAQ
Login
Join Now
RSS
Master.dev App on the Apple App Store
Master.dev App on Google Play
Contact: support@master.dev
Master.dev is proudly made in Minneapolis, MN
©2026 Master.dev · Terms of Service · Privacy Policy

Skip to last replySkip to top
Skip to main content

WeWeb Community

Sign Up

Log In


​
👋 Welcome to the WeWeb community
Get help, explore tutorials, and share your projects

Start Learning
Explore docs & tutorials.

Share Your Work
Submit your app, tutorial or project.

Submit a Bug Report
Something broken? Let us know.

Promotion banner
×
Marquee CSS animation
Ask us anything
How do I?
css
,
custom-css

629
views

1
link



Sep 2023
Oct 2023
post by FJP84 on Sep 28, 2023

FJP84
Sep 2023
Hi there,

I was trying to recreate below (Marquee in Webflow) in Webweb. I succeeded mostly, but in weweb the elements eventually are overlapping and the Infinity of the loop is not as smooth as in the video below. It stutters a bit so you can notice when it starts over.

I believe overlapping is caused because I am not able to correctly set the flex-shrink to zero, but thats an assumption.

Has anyone managed to create this kind of animation wit a bit of custom css but primarily by configure the elements in webweb itself?

You Can't Find a Better Infinite Marquee
You Can't Find a Better Infinite Marquee


Solved

Geovany Ferreira
Sep 2023

​
Hi there,

I was trying to recreate below (Marquee in Webflow) in Webweb. I succeeded mostly, but in weweb the elements eventually are overlapping and the Infinity of the loop is not as smooth as in the video below. It stutters a bit so you can notice when it starts over.

I believe overlapping is caused because I am not able to correctly set the flex-shrink to zero, but thats an assumption.

Has anyone managed to create this kind of animation wit a bit of custom css but primarily by configure the elements in webweb itself?

hi @FJP84
I think you can do it this way


read more

629
views

1
link



post by Joyce on Sep 29, 2023
post by GeovanyFerreira on Sep 30, 2023
post by FJP84 on Oct 1, 2023

Reply

Related topics
Topic list, column headers with buttons are sortable.
Topic	Replies	Views	Activity
Adding infinite marquee animation
Ask us anything
3	477	Jun 2024
Button animation border
How do I?
5	249	May 2024
Entry animations
How do I?
1	349	Jan 2025
Cannot change opacity of a div via JS
Ask us anything
13	465	Feb 2024
UI animation like Checkset
How do I?
3	280	Apr 2023

Skip to where you left off (last reply, post 4)Skip to top
Skip to main content

WeWeb Community
UI animation like Checkset
Ask us anything
How do I?

Log In


​
👋 Welcome to the WeWeb community
Get help, explore tutorials, and share your projects

Start Learning
Explore docs & tutorials.

Share Your Work
Submit your app, tutorial or project.

Submit a Bug Report
Something broken? Let us know.

Promotion banner
×
UI animation like Checkset
Ask us anything
How do I?

280
views


Mar 2023
Apr 2023
post by FJP84 on Mar 8, 2023

FJP84
Mar 2023
Hi there,

On the Weweb homepage I see an example of Checkset. Going to that site I noticed some simple and elegant UI animations, like the image on the right fading/sliding in from the right. Can someone put me in the right direction how to be able to configure this myself. I did look around in the transition settings but without result.

Thanks in advance.



280
views


1 month later
post by FJP84 on Apr 13, 2023

FJP84
Apr 2023
Anyone able to shed some light on this. For Example how can I transition a DIV “sliding” in from the right when the page is scrolling towards it’s position on de screen?


post by luka on Apr 14, 2023

luka
Apr 2023
Checkset product is built with WeWeb, but the website is built with Webflow. I don’t think we have an easy way to trigger animations on scroll, but you should be able to replicate the animation using Transform in ‘Advanced’


post by FJP84 on Apr 14, 2023

FJP84
Apr 2023
Ah that makes sense. Thanks



Reply

Related topics
Topic list, column headers with buttons are sortable.
Topic	Replies	Views	Activity
Animation, beta?
How do I?
11	552	Apr 2024
Page transition animation
Ask us anything
4	73	Apr 2025
Animations for landing page
Ask us anything
1	42	Sep 2025
Smooth transitions of page elements and progress bar
How do I?
design
4	624	May 2024
Entry animations
How do I?
1	349	Jan 2025

You spin me right round, baby. Like a record, baby.You spin me right round, baby. Like a record, baby.

<div class="marquee">
  <div>
    <span>You spin me right round, baby. Like a record, baby.</span>
    <span>You spin me right round, baby. Like a record, baby.</span>
  </div>
</div>

body { margin: 20px; }

.marquee {
  height: 25px;
  width: 420px;

  overflow: hidden;
  position: relative;
}

.marquee div {
  display: block;
  width: 200%;
  height: 30px;

  position: absolute;
  overflow: hidden;

  animation: marquee 5s linear infinite;
}

.marquee span {
  float: left;
  width: 50%;
}

@keyframes marquee {
  0% { left: 0; }
  100% { left: -100%; }
}

Skip to main contentAccessibility help
css marquee animation "experimental"


AI Mode
All
Videos
Images
Short videos
Shopping
Forums
More
Tools
AI Overview
Here is a modern CSS marquee animation. It avoids the obsolete <marquee> tag. It uses CSS grid, flexbox, and @keyframes to create a smooth, continuous loop.
HTML Structure
html
<div class="marquee-container text-experimental">
  <div class="marquee-content">
    <span>EXPERIMENTAL • EXPERIMENTAL • EXPERIMENTAL • EXPERIMENTAL • </span>
    <!-- Duplicate content to ensure seamless looping -->
    <span aria-hidden="true">EXPERIMENTAL • EXPERIMENTAL • EXPERIMENTAL • EXPERIMENTAL • </span>
  </div>
</div>
Use code with caution.
CSS Styling
css
.marquee-container {
  overflow: hidden;
  user-select: none;
  display: flex;
  width: 100%;
  background: #000;
  padding: 10px 0;
}

.marquee-content {
  display: flex;
  flex-shrink: 0;
  white-space: nowrap;
  gap: 0;
  /* Adjust duration for speed */
  animation: scroll-marquee 10s linear infinite; 
}

/* Pause the animation on hover for better user experience */
.marquee-container:hover .marquee-content {
  animation-play-state: paused;
}

.marquee-content span {
  font-family: 'Courier New', monospace;
  font-weight: bold;
  font-size: 2rem;
  color: #00ffcc;
  text-transform: uppercase;
}

@keyframes scroll-marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}
Use code with caution.
Key Technical Details
Zero Jitter: The translateX(-50%) combined with duplicated text creates a flawless loop.
Accessibility: The aria-hidden="true" tag prevents screen readers from reading the duplicated text twice.
Flexbox Layout: Keeps the inline text items aligned perfectly horizontally.
Let me know if you want to customize this further:
Do you want the marquee to move right-to-left or left-to-right?
Would you like it to bounce back and forth instead of looping?
Should it include images or cards instead of plain text?






Ask anything


justin-chu/react-fast-marquee

GitHub
https://github.com › justin-chu › react-fast-marquee
... CSS animations to create silky smooth marquees ... "left", The direction the marquee slides. Warning: Vertical marquees are currently experimental and may be ...Read more
CSS Only

Codrops
https://tympanus.net › codrops › tag › css-only
An article about different experimental approaches of employing click events using CSS only. It summarizes and shows some clever hacks and smart tricks. Timed ...Read more
60+ CSS Text Animations

FreeFrontend
https://freefrontend.com › css-text-animations
7 May 2026 — It utilizes experimental CSS animation-timeline to bind complex trigonometric and geometric transitions directly to the user's scrollbar.Read more
51 CSS Animations on Scroll Your Visitors Will Love

Slider Revolution
https://www.sliderrevolution.com › resources › css-anima...
13 Feb 2025 — CSS scroll-timeline (experimental) for scroll-linked animations. While these methods have excellent performance, they lack the flexibility ...Read more
CSS Marquee Module Level 3

W3C
https://www.w3.org › CR-css3-marquee-20081205
5 Dec 2008 — is not experimental (i.e. a version specifically designed to pass the test suite and is not intended for normal usage going forward). This ...Read more
WebKit Marquee CSS: Bringin' Sexy Back

David Walsh Blog
https://davidwalsh.name › webkit-marquee-css
5 Jul 2010 — It is an experimental implementation, though it works well with IE7+. Other people might find it useful as well, https://github.com/gajus/ ...Read more
The Opposite Machine CSS Marquee | Infinite Orbit UI

CodeTap
https://codetap.org › Projects
Motion design and CSS animation demonstrations; Experimental user interface concepts; Educational examples for advanced CSS transforms. Technology Stack. HTML5 ...
CSS Animation Example: Reveal on Scroll

Quackit Tutorials
https://www.quackit.com › css › animations › examples
The observer keeps watching and animating items down the page. While experimental CSS features like animation-timeline: view() exist, the most robust and ...Read more
5 Cool Things To Do with DevTools AI Assistance | Blog

Chrome for Developers
https://developer.chrome.com › blog › 5-cool-things-to...
21 Oct 2024 — A screen recording of how AI assistance helps implement a marquee effect using CSS animations Experimental ... CSS really got powerful by now.Read more
People also search for
Css marquee animation experimental github
Css marquee animation experimental template
Css marquee animation experimental examples
Css marquee animation experimental navbar
Text animation CSS CodePen
CSS text animation Generator
Scroll animations CSS
Scroll animation CSS examples
1	
2
3
4
5
6
7
8
9
10
Next
Results are not personalised
India
201318, Ghaziabad, Uttar Pradesh - From your IP address
 - Update location
Help
Send feedback
Privacy
Terms


Skip to content
Building for clients? One license, up to 250 sites

Latest version: 7.1.2

Slider Revolution
Templates
Design
Features
SR is for
Resources
Account
Buy now
51 CSS Animations on Scroll Your Visitors Will Love
February 13, 2025
Resources
Bogdan Sandu
Bring your web pages to life with CSS animations on scroll! Learn how to captivate visitors with dynamic effects that trigger as they navigate.


Scrolling through web pages, CSS animations on scroll transform static websites into dynamic experiences. The modern web design landscape demands interactivity, and these scroll-triggered animations have become essential for creating engaging user interfaces. Using Intersection Observer API and proper animation timing functions, developers can craft experiences that respond naturally to user interaction.

Why should you care?

These animations significantly boost UX improvements:

Increased engagement metrics (lowering bounce rates)
Improved Core Web Vitals when properly optimized
Enhanced visual storytelling capabilities
Better accessibility (when implemented with standards in mind)
Whether you’re deep into front-end development or just starting with CSS3 capabilities, mastering these techniques elevates your projects beyond static displays.

You’ll discover how to implement scroll-based transitions through keyframe animations, enhance viewport-based animations, and explore real-world applications that drive conversion.

By the end, you’ll have practical knowledge of implementing scroll-activated effects that work across browsers. We’ll examine how tools like GSAP ScrollTrigger and AOS Library can transform ordinary sites into interactive experiences, meeting the demands of truly modern website design while maintaining performance.

Without proper implementation, however, these animations can harm your web performance metrics and create accessibility issues. We’ll cover best practices for balancing visual impact with technical excellence.

Creative Portfolio Website Slider

Get Slider Revolution and use this template
Scrolling animations don’t need to be built from scratch. Animation libraries like GSAP offer pre-built solutions that balance performance with visual impact. The Creative Portfolio Website template demonstrates how scroll-triggered animations can showcase work professionally while maintaining strong Core Web Vitals.

This one-page portfolio uses scroll-activated effects that work across all devices, thanks to proper mobile responsiveness implementation. The animations serve a purpose: highlighting projects progressively as users scroll, creating a natural visual hierarchy.

Woodworking Website Template

Get Slider Revolution and use this template
Single-page applications benefit tremendously from thoughtful CSS animation on scroll implementation. This template demonstrates how craft-focused businesses can create an immersive web experience without sacrificing performance.

The template uses scroll event handling to trigger subtle wood-grain animations that enhance the theme without distracting from content. This technique uses animation easing functions that mimic natural materials.

Architecture Website Template

Get Slider Revolution and use this template
Architecture firms need precise, structured websites. This template uses parallax effect and scroll-based transitions to create depth while maintaining clean lines.

The template integrates ScrollTrigger functionality that responds to viewport position, creating a sense of 3D space on a 2D screen. For architecture firms, this spatial awareness connects directly to their brand values.

Food Delivery Lottie Scroll

Get Slider Revolution and use this template
Lottie animations represent a powerful approach to scroll-triggered effects that balance file size with visual complexity. This template shows how food delivery services can use animation to explain their process.

The scroll-linked animations explain the delivery journey step-by-step, improving user understanding through visual storytelling. This directly addresses user questions about how the service works.

Design DNA Scroll Video

Get Slider Revolution and use this template
Video content typically consumes significant bandwidth. This template demonstrates how scroll-based navigation can make video consumption more interactive and efficient.

Story Blocks

Get Slider Revolution and use this template
Storytelling drives engagement, but long-form content often suffers from poor readability online. The Story Blocks template addresses this through progressive enhancement with CSS3 capabilities.

Corporate Website Template

Get Slider Revolution and use this template
Corporate sites must balance professionalism with engagement. This template demonstrates how subtle CSS transform properties can create movement that guides without distracting.

The responsive implementation ensures animations work across devices, addressing the challenge of maintaining consistent animation timing functions across varied screen sizes.

Scroll-activated progress bar

Author: Bogdan Sandu from WPDean and Design Your Way

Progress indicators provide crucial user feedback during navigation. This implementation by Bogdan Sandu shows how a simple scroll event listener can create an intuitive reading progress bar.

This technique improves user experience enhancement by:

Providing constant spatial awareness within long content
Creating visual feedback that responds to user actions
Establishing a sense of progress and achievement
When paired with proper animation performance metrics monitoring, these small UI enhancements significantly improve engagement without performance penalties.

Entrance animation

Author: AndreasSikjaer

This example by AndreasSikjaer demonstrates proper viewport calculations for triggering animations only when elements enter the screen.

A pen by Mais

Author: Mais
This implementation demonstrates CSS animation keyframes with four-way control options, allowing directional animations based on scroll behavior.

The animation applies natural physics principles to movement, with acceleration and deceleration that feels intuitive to users. This attention to animation easing functions creates a sense of quality that static interfaces lack.

Trigger a CSS animation on the scroll

Author: MrJohnson

This example by MrJohnson demonstrates text-based animations with minimal animation delay, creating a clean, sequential reveal effect.

The implementation uses staggered timing to create hierarchy, drawing attention first to headings, then to supporting content. This technique supports natural reading patterns and information processing.

Visual hierarchy reinforcement through animation timing helps users understand content relationships without requiring explicit visual cues like arrows or lines.

CSS Reveal Slider

Author: Adam Kuhn

Adam Kuhn’s implementation uses animation direction creatively, with sliding color overlays that gradually reveal images.

This technique creates anticipation and draws attention to key visual elements through controlled timing. The staggered reveal forces users to notice each element individually rather than skimming past important content.

ScrollifyJS + AnimateCSS + Flexbox

Author: Zeindelf

This tool by Zeindelf demonstrates how combining multiple animation libraries can create complex experiences while maintaining code maintainability.

Design visually attractive and high-performing websites without writing a line of code
WoW your clients by creating innovative and response-boosting websites fast with no coding experience. Slider Revolution makes it possible for you to have a rush of clients coming to you for trendy website designs.

Start designing
CSS Scroll Reveal Sections

Author: Ryan Mulligan

Ryan Mulligan’s implementation uses clip-path properties to create hero sections with fixed positions, demonstrating advanced masking techniques that create depth without using resource-intensive 3D transforms.

CSS scroll-behavior, scroll-snap-type & mix-blend-mode

Author: Andrej Sharapov

Andrej Sharapov demonstrates how native CSS properties can create complex scroll-based transitions without JavaScript, improving performance and reducing dependency chains.

Screen scroll effect

Author: tejasprithvi

Tejasprithvi’s implementation demonstrates responsive scroll animations that work consistently across devices, addressing the challenge of creating reliable animations for varying screen sizes.

3D CSS Scroll

Author: Shaw

Shaw demonstrates a simple yet eye-catching scroll effect with easily adjustable animation duration settings. The implementation creates depth through subtle parallax movements, creating an immersive experience without overwhelming users.

3D Ebook Flip Animation

Author: Saranya Mohan

Saranya Mohan’s flip-style animation demonstrates advanced CSS transform properties that create realistic page-turning effects. The implementation creates a tactile quality that connects digital interaction to familiar physical experiences.

Animated Info Card

Author: Adam Kuhn

Adam Kuhn’s navigable info card demonstrates how animations can replace traditional UI patterns while improving engagement. The almost purely CSS implementation achieves complex interactions without heavy JavaScript dependencies.

(WIP) Using: target for basic animation

Author: Glenn Philp

Glenn Philp demonstrates how the CSS :target selector can create simple scroll-activated effects without JavaScript, improving performance and reducing code complexity.

Skew Scrolling Effect

Author: Dronca Raul

Dronca Raul’s implementation demonstrates how animation direction can create interesting visual effects that respond dynamically to scroll behavior. The tilting lines create visual interest without distracting from content.

CSS only Scrolling shadow

Author: Temani Afif

Temani Afif demonstrates how simple CSS effects can significantly improve readability for text-heavy content. The scrolling shadow provides crucial visual feedback about content overflow, addressing a common usability challenge.

Reverse Cross

Author: Jason Skrzypek

Jason Skrzypek demonstrates colorful transitions with straightforward CSS implementation. The effect creates visual interest through color theory application, using complementary colors to create tension and resolution during scroll transitions.

Head for the Hills

Author: Adam Kuhn

This is a beautiful animation that changes a simple subscription bar into an animated scene. After placing an email address, selecting subscribe sends the letters running into the subscription box with a flourish. It’s a great example of taking a simple feature and making it interesting.

Codevember 4 :: Sky

Author: Magnificode

This animation provides you with a mountainous background that moves while you scroll. As you scroll, the picture will split into the text you want to display.

Overlapping horizontal slideshow using position: sticky;

Author: Håvard Brynjulfsen

A simple animation that displays a slideshow of images from left to right.

GSAP ScrollTrigger – Marquee Page Border

Author: Ryan Mulligan

An interesting animation tool that’s great for large amounts of text.

Endless Hallway

Author: Adam Kuhn

Another interesting animation that would act as a great loading screen. It is also animated somewhat jaggedly, which gives it a sketchbook feel.

Parallax scrolling effect

Author: Oleksandr H.

As you scroll through a page, this animation will draw images swiftly along with the connected text. With this effect, visitors will surely enjoy surfing through your site!

Full Screen Vertical Scroll Snap

Author: Adam Argyle

This is a basic animation that speeds up movement whenever a visitor scrolls.

Scrolling Gradient

Author: Mike

An animation that adapts a background gradient depending on the scroll position.

Ghibli Slider

Author: Adam Kuhn

A visually appealing slideshow animation that was built through a collaboration with Studio Ghibli, the popular animation company.

Return to the Scroll Effects of the Future!

Author: Tim Pietrusky

This group of scroll animations includes a list of nine different animations split into different categories. Each of these effects is premade, so you can apply them at your leisure.

Agency website POC

Author: Jamie Coulter

Another great tool for businesses looking to spruce up their website, this animation includes many eye-catching features.

Scrolling Story Cards

Author: Mike England

An animation that works great as a timeline for your website.

Parallax Scrolling animations

Author: Sonia Grant

This tool includes multiple animations that create a full-size website with many elements. If you’re looking for an all-in-one tool, this is for you.

[Pure CSS] – One page scroll

Author: Quentin Veron

A very simple one-page scroll. It doesn’t even have one line of JavaScript!

High Performance Parallax

Author: nK

This animation smoothly displays images for your visitors by slowly revealing them, or by hiding the picture as you scroll. This encourages visitors to stay for longer and maintains interest.

Scroll-Triggered Animations (jQuery)

Author: Bramus

A group of eight interesting intro animations that can be easily implemented into any website.

Stacking Cards, Final Version

Author: Bramus

An animation that displays falling info cards that stack onto each other, building a pile of information by the end of the page.

Trigger a CSS animation on scroll

Author: bellachen

Another simple animation with flying text and wobbling images that will catch the eyes of your website visitors.

Overlapping sections only CSS

Author: Henry Zarza

An animation that uses overlapping text to build a falling line of text using position: sticky.

smoove.js css3 scroll effects

Author: Yifang Di

This animation is showcased through four groups of three images each. Each of these groups is demonstrated differently, but each in its own impressive way. They are bound to have a strong impression on your visitors.

CSS-Only Horizontal Parallax Gallery

Author: Paulina Hetman

This program showcases Paris photos in an experimental gallery. It uses perspective and color to draw visitors in while letting visitors have a part in building those elements.

CSS Animations on Scroll – Fade From Bottom up

Author: Rxn

A simple CSS animation that fades blocks in and out of view when scrolling up and down.

IntersectionObserver demo/test

Author: David Aerne

A simple CSS Animation with very little source code that creates a gradient background as you scroll. Although the background will stay a single solid color at first, as you scroll throughout the page a different color will take its place temporarily.

CSS Fixed Conic Fill

Author: Adam Argyl

Another gradient-based animation, but this one changes the text color by revealing a “fixed to viewport” background gradient.

CSS Animations on Scroll – Multi Step Move v2

Author: mmanindarkumar

A simple animation that displays elements moving within multiple steps.

CSS background change on scroll

Author: Giana

This CSS background features a fixed element that changes color depending on which page section it enters. This gives each image its own extra flair while leaving its original splendor intact.

Untitled

Author: Felipe Teixeira

Another multifaceted group of animations that would work well anywhere on your website.

Scrolling half by half pure #CSS by @Kseso

Author: Kseso

A fun demo using pure CSS animation. While scrolling through, each side will leave one half for a new image, and soon afterward switch. It’s a very useful tool that easily catches the eye.

FAQ on CSS Animations on Scroll
What is a CSS animation on scroll?
CSS animation on scroll combines standard CSS animations with scroll detection techniques. Unlike traditional animations that play automatically, these effects trigger when specific elements enter the viewport. They use JavaScript event listeners or newer APIs like Intersection Observer to determine when elements become visible.

The browser continuously checks element positions during scrolling. When an element reaches the viewport, a class gets added that activates pre-defined keyframe animations. This creates the illusion that scrolling itself causes the animation.

The technical implementation typically involves:

// Modern approach using Intersection Observer
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
});

document.querySelectorAll('.animate-on-scroll').forEach(element => {
  observer.observe(element);
});
This approach significantly improves performance compared to older scroll event methods.

How do I create scroll-triggered animations in CSS?
Creating effective scroll-based animations requires understanding several technologies:

CSS animations for defining the visual effects
Scroll event handling for detecting position
DOM manipulation for applying animation classes
Start with basic keyframe animations in your CSS:

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0; /* Start hidden */
}
Then use Intersection Observer API (or libraries like AOS or GSAP ScrollTrigger) to detect when elements enter the viewport:

// Using a library like AOS makes implementation simpler
document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    offset: 120,
    delay: 0,
    duration: 400,
    easing: 'ease',
    once: false,
    mirror: false
  });
});
For production sites, consider these implementation details:

Add proper animation timing functions for natural movement
Include fallbacks for browsers with limited support
Test performance on lower-end mobile devices
Why use CSS animations on scroll?
CSS animations tied to scrolling directly improve key Core Web Vitals metrics when implemented correctly. Here’s why they matter:

Improved engagement metrics:

Average session duration increases by 15-40% with interactive content
Bounce rates typically decrease 10-30% with proper visual feedback
Conversion rates improve through guided visual attention
Enhanced visual storytelling:

Creates natural information hierarchy through sequential reveals
Guides users through complex concepts step-by-step
Connects information points through visual relationships
Accessibility and technical benefits (when properly implemented):

Respects user preferences via prefers-reduced-motion media queries
Improves perceived performance through progressive content loading
Highlights important content changes for screen reader users when properly marked
Real-world data from e-commerce sites shows properly implemented scroll effects can increase product page conversion by 6-8% compared to static presentations.

Can CSS animations affect performance?
Yes. Poor animation implementation directly harms Core Web Vitals, especially Cumulative Layout Shift (CLS) and First Input Delay (FID). Common performance issues include:

Layout thrashing – forcing browser to recalculate positions repeatedly
Paint storms – triggering excessive repaints across large screen areas
Main thread blocking – running complex calculations during scrolling
To maintain 60fps smooth animations:

/* Properties that trigger cheap GPU compositing */
.performant-animation {
  transform: translateY(20px); /* Good: uses GPU */
  opacity: 0.8;                /* Good: uses GPU */
}

/* Properties that cause expensive repaints */
.problematic-animation {
  left: 20px;          /* Avoid: triggers layout */
  margin-top: 10px;    /* Avoid: triggers layout */
  box-shadow: 0 0 10px rgba(0,0,0,0.5); /* Expensive paint */
}
Tools to measure animation performance:

Chrome DevTools Performance panel
Layout shift regions in Chrome DevTools
requestAnimationFrame timing analysis
When optimized correctly, scroll animations can actually improve perceived performance by directing attention during content loading processes.

What are some popular CSS animation libraries?
Several animation libraries have emerged to simplify scroll-triggered animations implementation:

GSAP (GreenSock Animation Platform):

Exceptional performance with 60fps animations
Powerful ScrollTrigger plugin specifically for scroll animations
Advanced timeline control for complex sequences
// GSAP ScrollTrigger example
gsap.to(".element", {
  scrollTrigger: {
    trigger: ".element",
    start: "top 80%",
    end: "bottom 20%",
    scrub: true,
    markers: true
  },
  x: 300,
  rotation: 360,
  duration: 3
});
AOS (Animate On Scroll):

Lightweight with simple implementation
Good browser compatibility
HTML-attribute based configuration
Intersection Observer Utilities:

Native browser API with growing support
Minimal performance impact
Foundation for custom animation systems
Each library offers different tradeoffs between ease of use, performance, and control. For critical applications, GSAP typically provides the best performance metrics despite its larger file size.

How do I implement CSS scroll animations without JavaScript?
Pure CSS scroll animations without JavaScript have limited functionality but work for specific use cases:

/* Using scroll-behavior for smooth page navigation */
html {
  scroll-behavior: smooth;
}

/* Using scroll-snap for controlled scrolling positions */
.container {
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 100vh;
}

.section {
  scroll-snap-align: start;
  height: 100vh;
}

/* Sticky positioning for parallax-like effects */
.parallax-bg {
  position: sticky;
  top: 0;
  z-index: -1;
  height: 100vh;
}
CSS-only techniques include:

Scroll-snap properties for controlled paging effects
Position: sticky for simple parallax behavior
CSS scroll-timeline (experimental) for scroll-linked animations
While these methods have excellent performance, they lack the flexibility and browser support of JavaScript-enhanced approaches. They work well for simple effects but struggle with complex multi-element sequences.

Are scroll animations responsive?
Responsive scroll animations require additional consideration beyond typical responsive design:

Viewport-relative sizing – use vh/vw units or CSS variables adjusted via media queries
Threshold adjustments – modify when animations trigger based on screen size
Duration scaling – adjust animation timing for different devices
/* Base animation properties */
.animate-element {
  --animation-distance: 50px;
  --animation-duration: 0.8s;
}

/* Adjust for smaller screens */
@media (max-width: 768px) {
  .animate-element {
    --animation-distance: 30px;
    --animation-duration: 0.5s;
  }
}

.animate-element.in-view {
  animation: slideIn var(--animation-duration) forwards;
}

@keyframes slideIn {
  from {
    transform: translateY(var(--animation-distance));
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
Testing across devices is critical – animations that look subtle on desktop may feel jarring on mobile where content occupies more relative screen space. User testing shows preferred animation intensity typically decreases as screen size decreases.

Can animations be combined with parallax effects?
Parallax scrolling combined with scroll-based animations creates depth through multi-speed movement. This combination enhances spatial understanding and creates immersive experiences.

Effective implementation uses transform properties to avoid performance issues:

.parallax-container {
  perspective: 1px;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
}

.parallax-back {
  transform: translateZ(-1px) scale(2);
}

.parallax-base {
  transform: translateZ(0);
}

.parallax-front {
  transform: translateZ(0.5px) scale(0.5);
}
When animations are added to parallax elements, timing becomes critical:

// Adding animations to parallax layers
ScrollTrigger.create({
  trigger: ".section-1",
  start: "top bottom",
  end: "bottom top",
  scrub: true,
  animation: gsap.timeline()
    .to(".parallax-front .element", {
      x: 100,
      opacity: 1,
      duration: 1
    })
});
For best results, use animation speeds that complement the parallax movement rate – faster parallax typically pairs well with slower animations to prevent visual confusion.

How do I troubleshoot issues with scroll animations?
When scroll effect CSS isn’t working properly, follow this debugging process:

Step 1: Verify scroll detection Add visual indicators to confirm scroll events are firing:

// Debug logging for scroll detection
document.addEventListener('scroll', () => {
  console.log(`Scroll position: ${window.scrollY}`);
});

// For Intersection Observer
const debugObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    console.log(`Element visibility: ${entry.isIntersecting}`);
    console.log(`Intersection ratio: ${entry.intersectionRatio}`);
  });
}, {threshold: [0, 0.1, 0.5, 1]});
Step 2: Check animation definitions Isolate animations from scroll triggers to verify they work independently:

/* Test animation directly */
.test-animation {
  animation: fadeIn 1s forwards !important; /* Override any conditions */
}
Step 3: Inspect browser compatibility Use feature detection rather than browser detection:

// Check for Intersection Observer support
if ('IntersectionObserver' in window) {
  // Use modern approach
} else {
  // Use fallback
}
Common pitfalls:

Animation elements have display: none (can’t be measured)
Z-index issues causing elements to animate behind others
CSS specificity problems overriding animation classes
Performance throttling on mobile devices
Browser developer tools’ Animation Inspector and Performance panels provide insights for complex animation debugging.

What are examples of scroll animations in use?
Real-world implementations of CSS animation on scroll solve specific business and communication challenges:

Apple product pages use subtle scroll animations to:

Reveal product features progressively
Create 3D space through parallax movement
Guide attention to technical specifications
News sites like The New York Times use scroll animations for:

Data visualization sequencing
Long-form article engagement
Visual storytelling in journalistic content
E-commerce platforms implement scroll effects to:

Highlight product features through timed reveals
Create more engaging category browsing
Improve product comparison interactions
The key difference between successful and distracting implementations is purpose – effective animations serve specific communication goals rather than merely decorating the page.

Conclusion
CSS animations on scroll transform static websites into dynamic experiences when implemented correctly. They create natural visual hierarchy, guide user attention, and improve engagement metrics – all contributing to better conversion rates.

Key implementation takeaways:

Accessibility first: Always respect user preferences through prefers-reduced-motion and ensure animations don’t create barriers
Performance focus: Use transform and opacity for smooth animations, avoid layout-triggering properties
Purpose-driven design: Each animation should serve a specific user experience goal, not just decorate
Technical best practices:

Use Intersection Observer API instead of scroll events when possible
Test animations across devices with various processing capabilities
Implement progressive enhancement so content remains accessible when animations fail
The future of scroll-based transitions will continue evolving with upcoming APIs like CSS Scroll-Linked Animations (currently in development), which will allow even more performant native implementations without JavaScript.

For developers starting with scroll animations, focus first on subtle effects that guide users naturally without calling attention to the animation itself. As your skills advance, more complex sequences can create truly memorable experiences that differentiate your site and effectively communicate your brand’s message.

If you liked this article about CSS animations on scroll, you should check out this article about CSS animation libraries.

There are also similar articles discussing cool CSS buttons, CSS shadow effects, CSS blockquotes, and CSS blur effects.

And let’s not forget about articles on CSS charts, CSS headers, CSS parallax effects, and CSS page transitions.

The author

Bogdan Sandu

Bogdan Sandu specializes in web and graphic design, focusing on creating user-friendly websites, innovative UI kits, and unique fonts. Many of his resources are available on various design marketplaces. Over the years, he’s worked with a range of clients and contributed to design publications like Designmodo, WebDesignerDepot, and Speckyboy among others.

Creative Examples of CSS Flip Cards in Action
What Is a Service Based Website? A Quick Guide
Leave a Reply
Your email address will not be published.
Required fields are marked *

Comment *

Name *

Email *

Website


Save my name, email, and website in this browser for the next time I comment.



Upgrade your WordPress website today
Licenses start from $3.75/mo. Everything is included.


Any questions? We are here to help
Our efficient team of support wizards is ready.

Slider Revolution
About us
Build anything visually
Templates
Addons
Upgrade to premium
Support
Help center
Editor tour
FAQs
Open a ticket
Contact us
Complaints
DMCA
Versions
WordPress
Shopify
Magento
Prestashop
Typo3
Essential Grid Gallery
Resources
Pricing
Licensing
Terms of Use
Legal Disclosure
Privacy Policy
Cookie Preferences (GDPR)
Sitemap
Newsletter


W3C

CSS Marquee Module Level 3
W3C Candidate Recommendation 5 December 2008
This version:
http://www.w3.org/TR/2008/CR-css3-marquee-20081205
Latest version:
http://www.w3.org/TR/css3-marquee
Previous version:
http://www.w3.org/TR/2008/WD-css3-marquee-20080801
Editors:
Bert Bos (W3C) <bert@w3.org>
Copyright © 2008 W3C® (MIT, ERCIM, Keio), All Rights Reserved. W3C liability, trademark and document use rules apply.

Abstract
CSS describes the rendering of documents on various media. When documents (e.g., HTML) are laid out on visual media (e.g., screen or print) and the contents of some element are too large for a given area, CSS allows the designer to specify whether and how the overflow is displayed. One way, available on certain devices, is the “marquee” effect: the content is animated and moves automatically back and forth. This module defines the properties to control that effect.

Status of this document
This section describes the status of this document at the time of its publication. Other documents may supersede this document. A list of current W3C publications and the latest revision of this technical report can be found in the W3C technical reports index at http://www.w3.org/TR/.

This document was produced by the CSS Working Group as a Candidate Recommendation.

A Candidate Recommendation is a document that has been widely reviewed and ready for implementation. W3C encourages everybody to implement this specification and return comments to the (archived) public mailing list www-style@w3.org (see instructions). When sending e-mail, please put the text “css3-marquee” in the subject, preferably like this: “[css3-marquee] …summary of comment…”

Publication as a Candidate Recommendation does not imply endorsement by the W3C Membership. This is a draft document and may be updated, replaced or obsoleted by other documents at any time. It is inappropriate to cite this document as other than work in progress.

This document was produced by a group operating under the 5 February 2004 W3C Patent Policy. W3C maintains a public list of any patent disclosures made in connection with the deliverables of the group; that page also includes instructions for disclosing a patent. An individual who has actual knowledge of a patent which the individual believes contains Essential Claim(s) must disclose the information in accordance with section 6 of the W3C Patent Policy.

For this specification to exit CR, a minimum of six months must have elapsed, i.e., it will not become Proposed Recommendation before 5 June 2009.

Furthermore, there must be at least two independent, interoperable implementations of each feature. Each feature may be implemented by a different set of products, there is no requirement that all features be implemented by a single product. For the purposes of this criterion, we define the following terms:

independent
each implementation must be developed by a different party and cannot share, reuse, or derive from code used by another qualifying implementation. Sections of code that have no bearing on the implementation of this specification are exempt from this requirement.
interoperable
passing the respective test case(s) in the official CSS test suite, or, if the implementation is not a Web browser, an equivalent test. Every relevant test in the test suite should have an equivalent test created if such a user agent (UA) is to be used to claim interoperability. In addition if such a UA is to be used to claim interoperability, then there must one or more additional UAs which can also pass those equivalent tests in the same way for the purpose of interoperability. The equivalent tests must be made publicly available for the purposes of peer review.
implementation
a user agent which:
implements the specification.
is available to the general public. The implementation may be a shipping product or other publicly available version (i.e., beta version, preview release, or “nightly build”). Non-shipping product releases must have implemented the feature(s) for a period of at least one month in order to demonstrate stability.
is not experimental (i.e. a version specifically designed to pass the test suite and is not intended for normal usage going forward).
This specification only defines the marquee effect for level 2 of the CSS box model, i.e., for horizontal text only, as defined by CSS level 2 [CSS21]. It is expected that this specification will be updated and generalized to include vertical text, once the CSS Text Layout module [CSS3TEXTLAYOUT] is stable.

Table of contents
1.Dependencies on other modules
2.Introduction
3.How to read this specification
4.Terminology
5.The ‘overflow-style’ property
6.The ‘marquee-style’ property
7.The ‘marquee-play-count’ property
8.The ‘marquee-direction’ property
9.The ‘marquee-speed’ property
10.Conformance
11.Acknowledgments
12.Changes
References
Index
Property index
1. Dependencies on other modules
This CSS module depends on the following other CSS modules:

Cascading Style Sheets Level 2 Revision 1 [CSS21] for the properties overflow, display, width, margin-left, margin-right, and direction.
2. Introduction
(This section is not normative.)

The marquee effect consists of the UA slowly moving the content of a box so that, over time, all parts of the box are visible at least once. The speed of the movement, whether the movement is in one direction only or back and forth, how far the content moves and how often may vary. But, unlike for most other scrolling mechanisms, the scrolling does not depend on user events. Typically, marquee is used in contexts where there is no room for a scrollbar or other visible mechanism or when user interaction is limited: instead of actively moving hidden content into view, the user waits while the content moves by.

The following rules put the contents of each list item on a single line (unless it has hard line breaks) and causes the list items that are too wide to use a marquee effect (on UAs that support marquee):

li {overflow: auto; overflow-style: marquee-line; white-space: nowrap}
3. How to read this specification
All sections are normative, unless stated otherwise.

Examples look like this and normally start with the word “Example.” Examples are not normative.

Notes look like this and normally start with the word “Note.” Notes are not normative.

Each property is defined in part in the text and in part by a table that groups together a number of facts about the property, including a regular expression to restrict its syntax. See section 1.4.2 of CSS 2.1 [CSS21] for the meaning. The “Inherited” and “Initial” rows in the table are used by the Cascading and Inheritance module [CSS3CASCADE] and “Media” by the Media Queries specification [MEDIAQ].

4. Terminology
A glossary of technical terms (UA, used value, style sheet, element, etc.) can be found in chapter 3 of CSS level 2 [CSS21]. The specification may refer to the specified value, the used value and the computed value of a property as defined in CSS 2.1 [CSS21]. Unless stated explicitly, the short form “value” means the computed value.

5. The ‘overflow-style’ property
Name:	overflow-style
Value:	auto | marquee-line | marquee-block
Initial:	auto
Applies to:	same as ‘overflow’
Inherited:	yes
Percentages:	N/A
Media:	visual
Computed value:	as specified
This property specifies the preferred scrolling method for elements that overflow (see the ‘overflow’ property.) If the UA does not support the specified value, it must act as if the value was ‘auto’.

auto
The UA chooses the scrolling mechanism. Marquees and scrollbars are common mechanisms, but the UA may also use others.
marquee-line
This selects marquee as the horizontal scrolling mechanism (i.e., for content that overflows to the left or right). The scrolling mechanism in the perpendicular direction is left to the UA, but should not be marquee.
marquee-block
This selects marquee as the vertical scrolling mechanism (i.e., for content that overflows above or below the box). The scrolling mechanism in the perpendicular direction is left to the UA, but should not be marquee.
6. The ‘marquee-style’ property
Name:	marquee-style
Value:	scroll | slide | alternate
Initial:	scroll
Applies to:	same as ‘overflow’
Inherited:	no
Percentages:	N/A
Media:	visual
Computed value:	as specified
The values are:

scroll
Start completely off one side, scroll all the way across and completely off. The following pseudo-code defines the behavior when the marquee direction is to the left (see ‘marquee-direction’). The other directions are analogous.

Set the element to clip the overflow to the left and to the right
Create an anonymous box B around the content; set its ‘width’ so as to include all content and all overflow exactly; set its ‘margin-right’ to ‘auto’
Set n to the value of ‘marquee-play-count’
While n ≠ 0:
Set ‘margin-left’ of B to 100% (i.e., all contents is off to the right and thus invisible)
Decrease ‘margin-left’ at constant speed (see ‘marquee-speed’) until ‘margin-right’ is 100% (i.e., all content is off to the left and thus invisible)
Decrease n by one
slide
Start completely off one side, scroll in, and stop as soon as no more content is off that side. The following pseudo-code defines the behavior when the marquee direction is to the left (see ‘marquee-direction’). The other directions are analogous.

Set the element to clip the overflow to the left and to the right
Create an anonymous box B around the content; set its ‘width’ so as to include all content and all overflow exactly; set its ‘margin-right’ to ‘auto’
Set n to the value of ‘marquee-play-count’
While n ≠ 0:
Set ‘margin-left’ of B to 100% (i.e., all contents is off to the right and thus invisible)
Decrease ‘margin-left’ at constant speed (see ‘marquee-speed’) until ‘margin-right’ is 0
Decrease n by one
alternate
Bounce back and forth. The following pseudo-code defines the behavior when the initial marquee direction is to the left (see ‘marquee-direction’). The other directions are analogous.

Set the element to clip the overflow to the left and to the right
Create an anonymous box B around the content; set its ‘width’ so as to include all content and all overflow exactly
Set r to false
Set n to the value of ‘marquee-play-count’
While n ≠ 0:
If r, set ‘margin-right’ of B to 0 and ‘margin-left’ to ‘auto’; else, set ‘margin-left’ of B to 0 and ‘margin-right’ to ‘auto’
If r, decrease ‘margin-right’ at constant speed (see ‘marquee-speed’) until ‘margin-left’ is 0; else, decrease ‘margin-left’ at constant speed until ‘margin-right’ is 0
Set r to ¬r (i.e., the next loop will move in the opposite direction)
Decrease n by one
Three images: content to the right of a box, content
    overlapping the box, content to the left of the box.

This figure shows one loop of ‘marquee-style: scroll’. The initial state (1) has all content outside the box to the right. (2) shows an intermediate state. And the final state (3) has all content outside the box on the left.

Three images: content to the right of a box; some content in
    the box and some to the right; the right edge of the content is just
    inside the right edge of the box.

This figure shows one loop of ‘marquee-style: slide’. The initial state (1) has all content outside the box to the right. (2) shows an intermediate state. And the final state (3) has the right edge of the content just inside the right edge of the box and some content overflowing to the left of the box.

Five images: content overflows a box only on the right;
    content overflows on both sides; content overflows only on the left;
    content overflows on both sides; content overflows only on the right.

This figure show two loops of ‘marquee-style: alternate’. The initial state (1) has the left edge of the content aligned to the left edge of the box and content overflowing on the right. (2) shows an intermediate state, while the content moves to the left. The end of the first loop is state (3). (4) is an intermediate state of the second loop. (5) is the end of the second loop and is equal to state (1).

When the algorithm stops (n = 0), the rendering is left in the state as described. The content is not reset to its initial position. The exception is when ‘marquee-play-count’ is ‘0’. In that case, no looping occurs but the rendering is as it would have been after 2 loops.

The content of an element moves as one piece. E.g., if an element has two lines of text, both lines scroll together, even if only one of them overflows.

7. The ‘marquee-play-count’ property
Name:	marquee-play-count
Value:	<non-negative-integer> | infinite
Initial:	1
Applies to:	same as ‘overflow’
Inherited:	no
Percentages:	N/A
Media:	visual
Computed value:	as specified
This property specifies how many times the content moves. UAs should restart the loop count every time the element turns from completely invisible into (fully or partially) visible. E.g., an element that is outside the viewport starts moving when it is scrolled into view.

A UA may also take the visibility of the UA viewport itself into account, e.g., if the element is hidden behind a pop-up window or if the UA is iconified.

If ‘marquee-play-count’ is different for different states of the element, e.g., ‘p {marquee-play-count: 0} p:hover {marquee-play-count: infinite}’, the loop counter must be reset each time the element enters a state with a different computed value.

For example, if the content of an li overflows under the following style rules, the content moves once when the li gets the focus or is hovered over. But, when it already has the focus when it is hovered over, the ‘marquee-play-count’ property doesn't change and thus the content doesn't move again:

li {overflow: auto; overflow-style: marquee; marquee-play-count: 0}
li:focus, li:hover {marquee-play-count: 1}
If the specified value is ‘infinite’ or greater than 16, the UA may stop after 16 loops.

8. The ‘marquee-direction’ property
Name:	marquee-direction
Value:	forward | reverse
Initial:	forward
Applies to:	same as ‘overflow’
Inherited:	yes
Percentages:	N/A
Media:	visual
Computed value:	as specified
This property determines the initial direction in which the content moves if the marquee effect is used. ‘Forward’ moves the text so that hidden text appears in the normal reading order, ‘reverse’ does the opposite. The actual direction therefore depends on ‘direction’ and ‘overflow-style’ of the element, as follows:

‘overflow-style’	‘direction’	‘forward’	‘reverse’
‘marquee-line’	‘ltr’	left	right
‘rtl’	right	left
‘marquee-block’		up	down
Note that ‘marquee-style: alternate’ moves content in the opposite direction from this table on every other loop.

Note that the ‘direction’ property is often set by rules in the UA style sheet based on mark-up in the document, as recommended in CSS 2.1 [CSS21] section 9.10 (“Text direction: the direction and unicode-bidi properties”).

9. The ‘marquee-speed’ property
Name:	marquee-speed
Value:	slow | normal | fast
Initial:	normal
Applies to:	same as ‘overflow’
Inherited:	no
Percentages:	N/A
Media:	visual
Computed value:	as specified
This property determines how fast the content scrolls. The actual speed depends on the UA and the type of content. But, for a given UA and a given element, the following must always be true: slow < normal < fast.

10. Conformance
A document or implementation cannot conform to this module alone, but can claim conformance as part of conforming to CSS or another language that normatively references this module. An example of such a language is the CSS Mobile Profile [CSS-MOBILE]. Conformance is defined for the following kinds of objects. UAs may fall in more than one category.

style sheet
A CSS style sheet (or a complete unit of another language that normatively references this module) conforms, if, for all properties from this module that it contains, it satisfies the syntax defined here.
UA that does not render
A UA that reads style sheets without rendering any content (e.g., a validator or pretty-printer), conforms if it accepts all the style sheets that satisfy the syntax defined by this module.
UA that generates CSS
A UA that generates style sheets or CSS fragments in the context of some other language (e.g., an authoring tool or pretty-printer), conforms if, for all properties defined here, it only generates syntax that conforms to this module.
renderer
A UA that renders content (e.g., a browser) conforms if it behaves as described by this module as modified by the language it claims conformance to.
For example, the Mobile Profile [CSS-MOBILE] requires that a rendering UA behave as described here for all properties, while the Print Profile [CSS-PRINT] allows a UA to ignore them.

11. Acknowledgments
The marquee properties were first described in “Wireless CSS,” the CSS profile of the Open Mobile Alliance (OMA), now unified with the CSS Mobile Profile [CSS-MOBILE].

Among the members of the CSS working group, Elika Etemad deserves special thanks, for giving so many concrete suggestions for improvements.

12. Changes
This document is the same as the last draft, except for one non-normative change. The “disposition of comments” explains in more detail how the (two) comments on the last draft were answered.

References
Normative references:

[CSS21]
Bert Bos; et al. Cascading Style Sheets Level 2 Revision 1 (CSS 2.1) Specification. 19 July 2007. W3C Candidate Recommendation. (Work in progress.) URL: http://www.w3.org/TR/2007/CR-CSS21-20070719
Informative references:

[CSS-MOBILE]
Svante Schubert. CSS Mobile Profile 2.0. 19 October 2007. W3C Working Draft. (Work in progress.) URL: http://www.w3.org/TR/2007/WD-css-mobile-20071019
[CSS-PRINT]
Melinda Grant. CSS Print Profile. 13 October 2006. W3C Working Draft. (Work in progress.) URL: http://www.w3.org/TR/2006/WD-css-print-20061013
[CSS3CASCADE]
Håkon Wium Lie. CSS3 module: Cascading and inheritance. 15 December 2005. W3C Working Draft. (Work in progress.) URL: http://www.w3.org/TR/2005/WD-css3-cascade-20051215
[CSS3TEXTLAYOUT]
Elika J. Etemad; Paul Nelson. CSS3 Text Layout Module. (forthcoming). W3C Working Draft. (Work in progress.)
[MEDIAQ]
Håkon Wium Lie; Tantek Çelik; Daniel Glazman. Media Queries. 6 June 2007. W3C Candidate Recommendation. (Work in progress.) URL: http://www.w3.org/TR/2007/CR-css3-mediaqueries-20070606
Index
conformance, #
CSS Mobile Profile, #
direction, #
display, #
element, #
glossary, #
margin-left, #
margin-right, #
marquee-direction, #
marquee-play-count, #
marquee-speed, #
marquee-style, #
overflow, #
overflow-style, #
style sheet, #
UA, #
used value, #
width, #
Property index
Property	Values	Initial	Applies to	Inh.	Percentages	Media
marquee-direction	forward | reverse	forward	same as ‘overflow’	yes	N/A	visual
marquee-play-count	<non-negative-integer> | infinite	1	same as ‘overflow’	no	N/A	visual
marquee-speed	slow | normal | fast	normal	same as ‘overflow’	no	N/A	visual
marquee-style	scroll | slide | alternate	scroll	same as ‘overflow’	no	N/A	visual
overflow-style	auto | marquee-line | marquee-block	auto	same as ‘overflow’	yes	N/A	visual
This version is outdated!
For the latest version, please look at https://www.w3.org/TR/css3-marquee/.
▴ expand

<h1>
  Sometimes I'll start a line of code and I
  <span class="magic">
    <span class="magic-star">
      <svg viewBox="0 0 512 512">
      <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
      </svg>
    </span>
    <span class="magic-star">
      <svg viewBox="0 0 512 512">
      <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
      </svg>
    </span>
    <span class="magic-star">
      <svg viewBox="0 0 512 512">
      <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
      </svg>
    </span>
    <span class="magic-text">don't even know</span>
  </span>
  where it's going.
</h1>

<a id="source-link" class="meta-link" href="https://linear.app/readme" target="_blank">
  <i class="fa-solid fa-link"></i>
  <span class="roboto-mono">Source</span>
</a>

<a id="yt-link" class="meta-link" href="https://youtu.be/yu0Cm4BqQv0" target="_blank">
  <i class="fa-brands fa-youtube"></i>
  <span>4 min tutorial</span>
</a>

:root {  
  --purple: rgb(123, 31, 162);
  --violet: rgb(103, 58, 183);
  --pink: rgb(244, 143, 177);
}

@keyframes background-pan {
  from {
    background-position: 0% center;
  }
  
  to {
    background-position: -200% center;
  }
}

@keyframes scale {
  from, to {
    transform: scale(0);
  }
  
  50% {
    transform: scale(1);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  
  to {
    transform: rotate(180deg);
  }
}

body {
  background-color: rgb(10, 10, 10);
  display: grid;
  height: 100vh;
  margin: 0px;
  overflow: hidden;
  place-items: center;
}

h1 {
  color: white;
  font-family: "Rubik", sans-serif;
  font-size: clamp(2em, 2vw, 4em);
  font-weight: 400;
  margin: 0px;
  padding: 20px;
  text-align: center;
}

h1 > .magic {
  display: inline-block;
  position: relative;
}

h1 > .magic > .magic-star {
  --size: clamp(20px, 1.5vw, 30px);
  
  animation: scale 700ms ease forwards;
  display: block;
  height: var(--size);
  left: var(--star-left);
  position: absolute;
  top: var(--star-top);
  width: var(--size);
}

h1 > .magic > .magic-star > svg {
  animation: rotate 1000ms linear infinite;
  display: block;
  opacity: 0.7;
}

h1 > .magic > .magic-star > svg > path {
  fill: var(--violet);
}

h1 > .magic > .magic-text {
  animation: background-pan 3s linear infinite;
  background: linear-gradient(
    to right,
    var(--purple),
    var(--violet),
    var(--pink),
    var(--purple)
  );
  background-size: 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  white-space: nowrap;
}

/* -- YouTube Link Styles -- */

#source-link {
  top: 60px;
}

#source-link > i {
  color: rgb(94, 106, 210);
}

#yt-link {  
  top: 10px;
}

#yt-link > i {
  color: rgb(239, 83, 80);
}

.meta-link {
  align-items: center;
  backdrop-filter: blur(3px);
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  cursor: pointer;  
  display: inline-flex;
  gap: 5px;
  left: 10px;
  padding: 10px 20px;
  position: fixed;
  text-decoration: none;
  transition: background-color 600ms, border-color 600ms;
  z-index: 10000;
}

.meta-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.meta-link > i, .meta-link > span {
  height: 20px;
  line-height: 20px;
}

.meta-link > span {
  color: white;
  font-family: "Rubik", sans-serif;
  transition: color 600ms;
}

let index = 0,
    interval = 1000;

const rand = (min, max) => 
  Math.floor(Math.random() * (max - min + 1)) + min;

const animate = star => {
  star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
  star.style.setProperty("--star-top", `${rand(-40, 80)}%`);

  star.style.animation = "none";
  star.offsetHeight;
  star.style.animation = "";
}

for(const star of document.getElementsByClassName("magic-star")) {
  setTimeout(() => {
    animate(star);
    
    setInterval(() => animate(star), 1000);
  }, index++ * (interval / 3))
}

/* -- ↓↓↓ If you want the sparkle effect to only occur on hover, replace lines 16 and on with this code ↓↓↓ -- */

// let timeouts = [],
//     intervals = [];

// const magic = document.querySelector(".magic");

// magic.onmouseenter = () => {
//   let index = 1;
  
//   for(const star of document.getElementsByClassName("magic-star")) {
//     timeouts.push(setTimeout(() => {  
//       animate(star);
      
//       intervals.push(setInterval(() => animate(star), 1000));
//     }, index++ * 300));
//   };
// }

// magic.onmouseleave = onMouseLeave = () => {
//   for(const t of timeouts) clearTimeout(t);  
//   for(const i of intervals) clearInterval(i);
  
//   timeouts = [];
//   intervals = [];
// }

<main>
      <p
        class="fluid"
        data-enable-grammarly="false"
        spellcheck="false"
        contenteditable="true"
      >
        CSS is awesome, right?
      </p>
      <p
        class="fluid"
        data-enable-grammarly="false"
        spellcheck="false"
        contenteditable="true"
      >
        CSS is awesome
      </p>
      <p
        class="fluid"
        data-enable-grammarly="false"
        spellcheck="false"
        contenteditable="true"
      >
        Right?!
      </p>
      <p
        class="fluid"
        data-enable-grammarly="false"
        spellcheck="false"
        contenteditable="true"
      >
        CSS
      </p>
    </main>
    <style id="frames" type="text/css"></style>
    <a
      class="bear-link"
      href="https://twitter.com/intent/follow?screen_name=jh3yy"
      target="_blank"
      rel="noreferrer noopener"
    >
      <svg
        class="w-9"
        viewBox="0 0 969 955"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="161.191"
          cy="320.191"
          r="133.191"
          stroke="currentColor"
          stroke-width="20"
        ></circle>
        <circle
          cx="806.809"
          cy="320.191"
          r="133.191"
          stroke="currentColor"
          stroke-width="20"
        ></circle>
        <circle
          cx="695.019"
          cy="587.733"
          r="31.4016"
          fill="currentColor"
        ></circle>
        <circle
          cx="272.981"
          cy="587.733"
          r="31.4016"
          fill="currentColor"
        ></circle>
        <path
          d="M564.388 712.083C564.388 743.994 526.035 779.911 483.372 779.911C440.709 779.911 402.356 743.994 402.356 712.083C402.356 680.173 440.709 664.353 483.372 664.353C526.035 664.353 564.388 680.173 564.388 712.083Z"
          fill="currentColor"
        ></path>
        <rect
          x="310.42"
          y="448.31"
          width="343.468"
          height="51.4986"
          fill="#FF1E1E"
        ></rect>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M745.643 288.24C815.368 344.185 854.539 432.623 854.539 511.741H614.938V454.652C614.938 433.113 597.477 415.652 575.938 415.652H388.37C366.831 415.652 349.37 433.113 349.37 454.652V511.741L110.949 511.741C110.949 432.623 150.12 344.185 219.845 288.24C289.57 232.295 384.138 200.865 482.744 200.865C581.35 200.865 675.918 232.295 745.643 288.24Z"
          fill="currentColor"
        ></path>
      </svg>
    </a>

@import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');
@import url('https://unpkg.com/normalize.css') layer(normalize);

@layer normalize, base, demo;

@layer demo {
  [data-style='classic'] {
    --chosen: var(--classic);
  }
  [data-style='flame'] {
    --chosen: var(--flame);
  }
  [data-style='aurora'] {
    --chosen: var(--aurora);
  }

  :root {
    --duration: calc(var(--placeholder-length, 10) * 0.2s);
    --place-color: light-dark(
      color-mix(in hsl, canvas, canvasText 20%),
      color-mix(in hsl, canvas, canvasText 20%)
    );
    --offset: calc(var(--bg-spread, 6) * 0.5ch);
    --angle: calc(var(--bg-angle) * 1deg);
    --flame: linear-gradient(
      var(--angle),
      #0000 calc(50% - var(--offset)),
      hsl(45 100% 60%) calc(50% - (var(--offset) - 0.5ch)),
      hsl(0 100% 50%),
      #0000 calc(50% + var(--offset))
    );
    --aurora: linear-gradient(
      var(--angle),
      #0000 calc(50% - var(--offset)),
      #a960ee,
      #ff333d,
      #ffcb57,
      #90e0ff,
      #0000 calc(50% + var(--offset))
    );
    --classic: linear-gradient(
      var(--angle),
      #0000 calc(50% - var(--offset)),
      canvasText,
      #0000 calc(50% + var(--offset))
    );
    --bg: var(--chosen) 0 0 / 300% 100% no-repeat border-box,
      linear-gradient(var(--place-color), var(--place-color)) padding-box;
  }

  main {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  main p {
    --font-level: 2;
    --duration: calc((var(--placeholder-length, 10) * var(--multiplier)) * 1s);
    margin: 0;
    border: 2px solid #0000;
    white-space: nowrap;
    line-height: 1.2;
    outline-offset: 0.1em;
    background: var(--bg);
    outline-color: hsl(280 90% 60% / 0.5);
    font-weight: 400;
    animation: shimmer var(--duration) infinite both ease-in-out;
    background-clip: text;
    color: transparent;
    display: inline-block;
    align-self: start;
  }

  @keyframes shimmer {
    0% {
      background-position: 100% 0;
    }
    50%,
    100% {
      background-position: 0% 0;
    }
  }

  [data-debug='true'] main p {
    animation: none;
    background-position: calc(var(--bg-position) * 1%);
  }
}

@layer base {
  :root {
    --font-size-min: 16;
    --font-size-max: 20;
    --font-ratio-min: 1.2;
    --font-ratio-max: 1.33;
    --font-width-min: 375;
    --font-width-max: 1500;
  }

  html {
    color-scheme: light dark;
  }

  [data-theme='light'] {
    color-scheme: light only;
  }

  [data-theme='dark'] {
    color-scheme: dark only;
  }

  :where(.fluid) {
    --fluid-min: calc(
      var(--font-size-min) * pow(var(--font-ratio-min), var(--font-level, 0))
    );
    --fluid-max: calc(
      var(--font-size-max) * pow(var(--font-ratio-max), var(--font-level, 0))
    );
    --fluid-preferred: calc(
      (var(--fluid-max) - var(--fluid-min)) /
        (var(--font-width-max) - var(--font-width-min))
    );
    --fluid-type: clamp(
      (var(--fluid-min) / 16) * 1rem,
      ((var(--fluid-min) / 16) * 1rem) -
        (((var(--fluid-preferred) * var(--font-width-min)) / 16) * 1rem) +
        (var(--fluid-preferred) * var(--variable-unit, 100vi)),
      (var(--fluid-max) / 16) * 1rem
    );
    font-size: var(--fluid-type);
  }

  *,
  *:after,
  *:before {
    box-sizing: border-box;
  }

  body {
    display: grid;
    place-items: center;
    background: light-dark(canvas, black);
    min-height: 100vh;
    font-family: 'SF Pro Text', 'SF Pro Icons', 'AOS Icons', 'Helvetica Neue',
      Helvetica, Arial, sans-serif, system-ui;
  }

  body::before {
    --size: 45px;
    --line: color-mix(in lch, canvasText, transparent 70%);
    content: '';
    height: 100vh;
    width: 100vw;
    position: fixed;
    background: linear-gradient(
          90deg,
          var(--line) 1px,
          transparent 1px var(--size)
        )
        50% 50% / var(--size) var(--size),
      linear-gradient(var(--line) 1px, transparent 1px var(--size)) 50% 50% /
        var(--size) var(--size);
    mask: linear-gradient(-20deg, transparent 50%, white);
    top: 0;
    transform-style: flat;
    pointer-events: none;
    z-index: -1;
  }

  .bear-link {
    color: canvasText;
    position: fixed;
    top: 1rem;
    left: 1rem;
    width: 48px;
    aspect-ratio: 1;
    display: grid;
    place-items: center;
    opacity: 0.8;
  }

  :where(.x-link, .bear-link):is(:hover, :focus-visible) {
    opacity: 1;
  }

  .bear-link svg {
    width: 75%;
  }

  /* Utilities */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
}

div.tp-dfwv {
  width: 270px;
}


import { Pane } from 'https://esm.sh/tweakpane@4.0.4'

let pos
let angle
let spread

const config = {
  theme: 'dark',
  placeholder: "What we cookin'?",
  position: 50,
  debug: false,
  multiplier: 0.12,
  bordered: true,
  spread: 3,
  angle: 295,
  style: 'classic',
}

const ctrl = new Pane({
  title: 'Config',
  expanded: true,
})

const main = document.querySelector('main')

const update = () => {
  document.documentElement.dataset.theme = config.theme
  document.documentElement.dataset.debug = config.debug
  document.documentElement.dataset.style = config.style
  pos.disabled = spread.disabled = angle.disabled = !config.debug
  document.documentElement.style.setProperty('--bg-position', config.position)
  document.documentElement.style.setProperty('--bg-spread', config.spread)
  document.documentElement.style.setProperty('--bg-angle', config.angle)
  document.documentElement.style.setProperty('--multiplier', config.multiplier)
}

const sync = (event) => {
  if (
    !document.startViewTransition ||
    event.target.controller.view.labelElement.innerText !== 'Theme'
  )
    return update()
  document.startViewTransition(() => update())
}

ctrl.addBinding(config, 'multiplier', {
  min: 0.05,
  max: 0.2,
  step: 0.01,
  label: 'Speed X',
})

ctrl.addBinding(config, 'style', {
  label: 'Style',
  options: {
    Classic: 'classic',
    Aurora: 'aurora',
    Flame: 'flame',
  },
})
ctrl.addBinding(config, 'debug', {
  label: 'Configure',
})
pos = ctrl.addBinding(config, 'position', {
  min: 0,
  max: 100,
  step: 1,
  label: 'Position',
  disabled: !config.debug,
})

spread = ctrl.addBinding(config, 'spread', {
  min: 2,
  max: 10,
  step: 1,
  label: 'Spread (ch)',
  disabled: !config.debug,
})

angle = ctrl.addBinding(config, 'angle', {
  min: 0,
  max: 360,
  step: 1,
  label: 'Angle (deg)',
  disabled: !config.debug,
})

ctrl.addBinding(config, 'theme', {
  label: 'Theme',
  options: {
    System: 'system',
    Light: 'light',
    Dark: 'dark',
  },
})

ctrl.on('change', sync)
update()

const syncLines = () => {
  ;[...main.children].forEach((child) => {
    child.style.setProperty('--placeholder-length', child.textContent.length)
  })
}

main.addEventListener('input', syncLines)
syncLines()

<input type="checkbox" name="play" id="play" checked="">
<input type="checkbox" name="case" id="case" checked="">

<div class="container">
  <div class="wrapper">
    <div class="swirl">
      <span>T</span>
      <span>H</span>
      <span>E</span>
      <span> </span>
      <span>E</span>
      <span>N</span>
      <span>D</span>
      <span> </span>
      <span>I</span>
      <span>S</span>
      <span> </span>
      <span>T</span>
      <span>H</span>
      <span>E</span>
      <span> </span>
      <span>B</span>
      <span>E</span>
      <span>G</span>
      <span>I</span>
      <span>N</span>
      <span>N</span>
      <span>I</span>
      <span>N</span>
      <span>G</span>
      <span> </span>
      <span>I</span>
      <span>S</span>
    </div>
    <label for="play" class="playBtn" title="Press to play">
      <div class="col">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <div class="col">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <div class="col">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <div class="col">
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <div class="col">
        <div class="dot"></div>
      </div>
    </label>
  </div>

  <div class="wrapper">
    <div class="swirl">
      <span>T</span>
      <span>H</span>
      <span>E</span>
      <span> </span>
      <span>E</span>
      <span>N</span>
      <span>D</span>
      <span> </span>
      <span>I</span>
      <span>S</span>
      <span> </span>
      <span>T</span>
      <span>H</span>
      <span>E</span>
      <span> </span>
      <span>B</span>
      <span>E</span>
      <span>G</span>
      <span>I</span>
      <span>N</span>
      <span>N</span>
      <span>I</span>
      <span>N</span>
      <span>G</span>
      <span> </span>
      <span>I</span>
      <span>S</span>
    </div>
    <label for="play" class="pauseBtn" title="Press to pause">
      <div class="col">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <div class="col">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </label>
  </div>
</div>

<div class="switchBox">
  <label class="lowerCase" for="case" title="Switch text to lowercase"></label>
  <label class="upperCase" for="case" title="Switch text to uppercase"></label>
</div>

body {
  margin: 0;
  background: #000;
  overflow: hidden;
  display: grid;
  height: 100vh;
  place-items: center;
  container-type: size;
}

.container {
  position: relative;
  display: flex;
  font-size: min(.9cqh, .45cqw);
  --h: 100em;
  height: var(--h);
  width: calc(2*var(--h) - 5.5em);
}

.wrapper {
  position: absolute;
  height: 100%;
  width: unset;
  aspect-ratio: 1;
  display: grid;


  &:nth-child(2 of .wrapper) {
    right: 0;
    bottom: unset;
  }

}

.swirl {
  position: absolute;
  inset: 0;
  --dur: 10s;
  display: grid;
  align-items: center;
  justify-items: unset;
  animation: spin var(--dur) linear infinite;

  :nth-child(2 of .wrapper) & { animation-direction: reverse; }
}

span {
  position: absolute;
  width: 50%;
  height: unset;
  color: #fff;
  font-family: monospace;
  font-weight: bold;
  font-size: calc(var(--h)/10);
  rotate: calc(360deg/28*var(--nth)*var(--dir));
  animation: fade var(--dur) linear infinite;
  animation-delay: calc(-1*var(--dur)/28 * var(--nth));
  --glow: hsl(calc(360deg/28*var(--nth)) 100% 50%);
  text-shadow: 0 0 1em var(--glow), 0 0 .5em var(--glow), 0 0 .25em var(--glow);

  &:nth-child(1) { --nth: 1;}
  &:nth-child(2) { --nth: 2;}
  &:nth-child(3) { --nth: 3;}
  &:nth-child(4) { --nth: 4;}
  &:nth-child(5) { --nth: 5;}
  &:nth-child(6) { --nth: 6;}
  &:nth-child(7) { --nth: 7;}
  &:nth-child(8) { --nth: 8;}
  &:nth-child(9) { --nth: 9;}
  &:nth-child(10) { --nth: 10;}
  &:nth-child(11) { --nth: 11;}
  &:nth-child(12) { --nth: 12;}
  &:nth-child(13) { --nth: 13;}
  &:nth-child(14) { --nth: 14;}
  &:nth-child(15) { --nth: 15;}
  &:nth-child(16) { --nth: 16;}
  &:nth-child(17) { --nth: 17;}
  &:nth-child(18) { --nth: 18;}
  &:nth-child(19) { --nth: 19;}
  &:nth-child(20) { --nth: 20;}
  &:nth-child(21) { --nth: 21;}
  &:nth-child(22) { --nth: 22;}
  &:nth-child(23) { --nth: 23;}
  &:nth-child(24) { --nth: 24;}
  &:nth-child(25) { --nth: 25;}
  &:nth-child(26) { --nth: 26;}
  &:nth-child(27) { --nth: 27;}
  &:nth-child(28) { --nth: 28;}
  
  :nth-child(1 of .wrapper) & {
    left: 50%;
    text-align: end;
    transform-origin: 0% 50%;
    --dir: 1;
    animation-direction: reverse;
  }
  :nth-child(2 of .wrapper) & {
    right: 50%;
    text-align: start;
    transform-origin: 100% 50%;
    --dir: -1;
  }
}

@keyframes spin {
  100% { rotate: 360deg; }
}

@keyframes fade {
  0%, 10% { opacity: 0; }
  55%, 100% { opacity: 1; }
}

input {
  display: none;
}

.wrapper label {
  position: absolute;
  width: 20em;
  aspect-ratio: 1;
  place-self: center;
  transition: all .5s ease-in-out;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.col {
  width: 10px;
  position: relative;
  display: grid;
  transition: inherit;
  align-items;
}

.dot {
  width: 3em;
  aspect-ratio: 1;
  border-radius: 50%;
  transition: inherit;
  border: 4px solid;
  margin-block: 2px;

  &:nth-child(1) { --nDot: 0; }
  &:nth-child(2) { --nDot: 1; }
  &:nth-child(3) { --nDot: 2; }
  &:nth-child(4) { --nDot: 3; }
  &:nth-child(5) { --nDot: 4; }

  .wrapper label:hover & {
    filter: drop-shadow(0 0 1em var(--glo)) drop-shadow(0 0 .5em var(--glo));
    margin-block: -2px;
  }

  .playBtn & {
    border-color: hsl(calc(120deg - 15deg*(4 - var(--nDot))) 100% calc(25% + 6.25%*(4 - var(--nDot))));
    --glo: #0b0;
  }
  .pauseBtn & {
    border-color: hsl(calc(30deg - 15deg*var(--nDot)) 100% 50%);
    --glo: red;
  }

  .playBtn:hover & { border-color: #bff; }
  .pauseBtn:hover & { border-color: #fdd; }

}

#play:not(:checked) ~ .container :is(.swirl, span) {
  animation-play-state: paused;
}

#play:checked ~ .container .playBtn,
#play:not(:checked) ~ .container .pauseBtn { scale: 0; }

.switchBox {
  position: absolute;
  place-self: end;
  margin: min(3.5cqw, 35px);
  display: grid;
  place-items: center;
  grid-template-columns: 1fr 2fr;
  gap: min(40px, 4cqw);
  transition: all .33s ease-in-out;

  & label {
    display: block;
    aspect-ratio: 1;
    border-radius: 50%;
    --shade: #fff;
    box-shadow: 0 0 0 min(1cqw, 10px) var(--shade), inset 0 0 0 min(1cqw, 10px) var(--shade);
    mix-blend-mode: lighten;
    transition: all .5s ease-in-out;
  }

  &:hover { gap: 0; }
}

.lowerCase { width: max(3cqw,35px);}
.upperCase { width: max(6cqw,70px); }

#case:checked ~ .switchBox .lowerCase,
#case:not(:checked) ~ .switchBox .upperCase { --shade: #555; }

#case:not(:checked) ~ .container span { text-transform: lowercase; }

@media (orientation: portrait) {
  .container {
    font-size: min(.9cqw,.45cqh);
    width: var(--h);
    height: calc(2*var(--h) - 11.5em);
  }

  .wrapper {
    width: 100%;
    height: unset;
    right: unset;
    bottom: 0;
  }

  .swirl {
    justify-items: center;
    align-items: unset;
  }

  span {
    height: 50%;
    width: unset;
    display: grid;

    :nth-child(1 of .wrapper) & {
      bottom: 50%;
      left: unset;
      text-align: end;
      transform-origin: 50% 100%;
      --dir: 1;
      animation-direction: reverse;
    }
    :nth-child(2 of .wrapper) & {
      top: 50%;
      right: unset;
      text-align: start;
      transform-origin: 50% 0%;
      --dir: -1;
      align-items: end;
    }
  }
}

<article>
  <h1>Animated Gradient Text</h1>
  <p>@property + linear-gradient() + background-clip + text-fill-color</p>
</article>

/* 
  these type the CSS variable as color
  unlocking the ability for the browser 
  to animate just that portion
*/
@property --＠color-1 {
  syntax: "<color>";
  inherits: false;
  initial-value: hsl(98 100% 62%);
}

@property --＠color-2 {
  syntax: "<color>";
  inherits: false;
  initial-value: hsl(204 100% 59%);
}

/* keyframes that change the color variable */
@keyframes gradient-change {
  to {
    --＠color-1: hsl(210 100% 59%);
    --＠color-2: hsl(310 100% 59%);
  }
}

article {
  /* apply variable changes over time */
  animation: gradient-change 2s linear infinite alternate;
  
  background: linear-gradient(
    /* 
      in oklch produces more vibrant gradient results 
      learn more https://developer.chrome.com/docs/css-ui/access-colors-spaces#color_interpolation
    */
    to right in oklch, 
    /* use the variables in a gradient (or wherever!) */
    var(--＠color-1), 
    var(--＠color-2)
  );
  
  /* old browser support */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  /* modern browser version */
  background-clip: text;
  color: transparent;
}












@layer demo.support {
  h1 {
    font-size: 10vmin;
    line-height: 1.1;
  }

  body {
    background: hsl(204 100% 5%);

    min-block-size: 100%;
    box-sizing: border-box;
    display: grid;
    place-content: center;

    font-family: system-ui, sans-serif;
    font-size: min(200%, 4vmin);

    padding: 5vmin;
  }

  h1, p, body {
    margin: 0;
    text-wrap: balance;
  }

  h1 {
    line-height: 1.25cap;
  }

  p {
    font-family: "Dank Mono", ui-monospace, monospace;
  }

  html {
    block-size: 100%;
  }

  article {
    display: grid;
    gap: 1lh;
    text-align: center;
  }
}

<h1>System<span style="color:white;">.<span style="color:#e06c75;">out</span>.</span><span style="color:#61afef;">println</span>("</h1>
<div class="string">
  <h1 class="greeting en">Hello World!</h1>
  <h1 class="greeting es">¡Hola Mundo!</h1>
  <h1 class="greeting de">Hallo Welt!</h1>
  <h1 class="greeting it">Ciao Mondo!</h1>  
</div>
<h1 class="closure">");</h1>

@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100;500&display=swap');

* {
  margin: 0;
  padding: 0;
}

body {
  background: #282c34;
  font-size: 2vmin;
  font-family: JetBrains Mono, monospace;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #e4bb68;
}

.string {
  display: flex;
  flex-direction: column;
  text-align: center;
  animation: move 4s infinite;
}

.greeting {
  position: relative;
  top: 8.6vmin;
  animation: white-out 5s infinite;
}

.closure::after {
  content: '';
  position: absolute;
  height: 25vmin;
  width: 40vmin;
  background: #282c34;
  transform: translate(-45vmin, -24.5vmin);
}

.closure::before {
  content: '';
  position: absolute;
  height: 25vmin;
  width: 40vmin;
  background: #282c34;
  transform: translate(-40vmin, 5vmin);
}

.en {
  color: #fa8231;
}

.es {
  color: white;
}

.de {
  color: #c678dd;
}

.it {
  color: #a9b0bd;
}

@keyframes move {
  25% {
    transform: translatey(-5.8vmin);
    opacity: 1;
  }
  50% {
    transform: translatey(-11vmin);
  }
  75% {
    transform: translatey(-16.5vmin);
  }
}

<div class="container">
	<div class="title">
		<h1>GHOST</h1>
	</div>
	<div class="ghost">
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</div>
</div>

@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap");

* {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}

body {
	min-height: 100vh;
	display: grid;
	place-items: center;

	--bkg: #5eb3fd;
	--white: #e7e6e6;

	background-color: var(--white);
	background-image: url("https://www.transparenttextures.com/patterns/concrete-wall.png");
}

.container {
	width: 100%;
	height: 100%;
	display: grid;
	place-items: center;
	overflow: hidden;
}

.title {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
.title h1 {
	font-size: 25vmin;
	font-weight: 900;
	font-family: "Montserrat", sans-serif;
	color: black;
}

.ghost {
	width: 8vmin;
	height: 12vmin;
	background-color: var(--white);
	background-image: url("https://www.transparenttextures.com/patterns/concrete-wall.png");
	background-image: radial-gradient(ellipse at 35% 40%, #000 8%, transparent 0%),
		radial-gradient(ellipse at 65% 40%, #000 8%, transparent 0%),
		radial-gradient(ellipse at 50% 60%, #000 8%, transparent 0%);
	border-radius: 100% / 70% 70% 0% 0%;
	transform: translateX(100em) rotateZ(-90deg);
	position: relative;
	opacity: 0.9;
	mix-blend-mode: exclusion;
	animation: ghostMove 4s ease-out infinite;
}
@keyframes ghostMove {
	0% {
		transform: translateX(30em) rotateZ(-90deg);
	}
	100% {
		transform: translateX(-35em) rotateZ(-90deg);
	}
}
.ghost div {
	position: absolute;
	width: 20%;
	background-color: var(--white);
	background-image: url("https://www.transparenttextures.com/patterns/concrete-wall.png");
}
.ghost div:nth-of-type(1) {
	height: 7vmin;
	left: 0;
	bottom: -6vmin;
	border-radius: 100% / 0% 0% 50% 50%;
}
.ghost div:nth-of-type(2),
.ghost div:nth-of-type(4) {
	height: 4vmin;
	left: 20%;
	bottom: -3vmin;
	border-radius: 100% / 50% 50% 0% 0%;
	background-color: transparent;
}
.ghost div:nth-of-type(3) {
	height: 4vmin;
	left: 40%;
	bottom: -3.95vmin;
	border-radius: 100% / 0% 0% 60% 60%;
	background-color: var(--white);
}
.ghost div:nth-of-type(4) {
	left: 60%;
}
.ghost div:nth-of-type(5) {
	height: 3vmin;
	left: 80%;
	bottom: -2.9vmin;
	border-radius: 100% / 0% 0% 70% 70%;
	background-color: var(--white);
}


<!--
/********************************************/
/********************************************/
/* Please ❤ this if you like it! */
/* Follow Me https://codepen.io/designfenix */
/********************************************/
/********************************************/
/**/
/**/
/**/
/**/
/**/
/**/
/**/
-->
<div class="version">
	<a href="https://codepen.io/designfenix/pen/OPyapww" target="_blank">Check out the new version with CSS and SVG</a>
</div>
<div class="frame">
	<div class="text">
		<span>❤</span>
		<span></span>
		<span>E</span>
		<span>V</span>
		<span>O</span>
		<span>L</span>
		<span></span>
		<span>H</span>
		<span>T</span>
		<span>I</span>
		<span>W</span>
		<span></span>
		<span>E</span>
		<span>D</span>
		<span>A</span>
		<span>M</span>
		<span></span>
		<span>❤</span>
		<span></span>
		<span>E</span>
		<span>V</span>
		<span>O</span>
		<span>L</span>
		<span></span>
		<span>H</span>
		<span>T</span>
		<span>I</span>
		<span>W</span>
		<span></span>
		<span>E</span>
		<span>D</span>
		<span>A</span>
		<span>M</span>
		<span></span>
		<span>❤</span>
		<span></span>
		<span>E</span>
		<span>V</span>
		<span>O</span>
		<span>L</span>
		<span></span>
		<span>H</span>
		<span>T</span>
		<span>I</span>
		<span>W</span>
		<span></span>
		<span>E</span>
		<span>D</span>
		<span>A</span>
		<span>M</span>

	</div>
</div>

<p id="dev">Developed with <span>❤</span> by <a href="https://codepen.io/designfenix/" target="_blank">Fernando Cohen</a> </p>

/********************************************/
/********************************************/
/* Please ❤ this if you like it! */
/* Follow Me https://codepen.io/designfenix */
/********************************************/
/********************************************/
/**/
/**/
/**/
/**/
/**/
/**/
/**/
/**/
/**/
/**/
/**/
/**/
/**/
/**/
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,600,700");
:root {
	--duration: 10s;
	--size: 80vw;
	--characters: 14;
	--font-size: 22px;
	--delay-character: 0.2s;
	--text-color-hover: #ff8489;
}

body {
	height: 100vh;
	display: flex;
	align-items: center;
	background: url(https://img.freepik.com/vector-gratis/fondo-abstracto-blanco_23-2148806276.jpg?size=626&ext=jpg)
		no-repeat center;
	background-size: cover;
}

.frame {
	width: var(--size);
	height: var(--size);
	max-width: 400px;
	max-height: 400px;
	margin: 0 auto;
	border: 2px #fbfbfb solid;
	position: relative;
	box-shadow: inset 0 0 0 20px white;
	background: url(https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80)
		no-repeat center;
	background-size: cover;
	transition: ease all 0.3s;
	&:hover {
		box-shadow: inset 0 0 0 0 white;
		border: 2px #f9f9f9 solid;
		cursor: pointer;
		.text {
			mix-blend-mode: difference;
			span {
				color: var(--text-color-hover);
			}
		}
	}
	.text {
		transform: translate(
			calc(calc(var(--font-size) * -1) / 2),
			calc(calc(var(--font-size) * -1) / 2)
		);
		position: relative;
		height: 100%;
		transition: ease all 0.3s;
	}
	span {
		font-size: var(--font-size);
		display: inline-block;
		text-align: center;
		width: var(--font-size);
		animation: frameMove var(--duration) linear infinite;
		position: absolute;
		transition: ease all 0.3s;
		@for $i from 1 through 52 {
			&:nth-of-type(#{$i}) {
				animation-delay: calc(var(--delay-character) * #{$i});
			}
		}
	}
}
@keyframes frameMove {
	0% {
		top: 0;
		left: 0;
		transform: rotate(0deg);
	}
	24% {
		top: 0;
		left: 100%;
		transform: rotate(0deg);
	}
	25% {
		transform: rotate(90deg);
	}
	49% {
		top: 100%;
		left: 100%;
		transform: rotate(90deg);
	}
	50% {
		transform: rotate(180deg);
	}
	74% {
		top: 100%;
		left: 0%;
		transform: rotate(180deg);
	}
	75% {
		transform: rotate(270deg);
	}
	99% {
		top: 0%;
		left: 0%;
		transform: rotate(270deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

/*Dev*/
.version {
	position: absolute;
	top: 0;
	right: 0;
	height: 40px;
	line-height: 40px;
	padding: 0 20px;
	background: #030303;
	a {
		color: white;
		font-family: "Montserrat", sans-serif;
		font-size: bold;
	}
}
#dev {
	font-family: "Montserrat", sans-serif;
	position: fixed;
	font-size: 14px;
	top: 10px;
	left: 10px;
	padding: 1em;
	color: #333;
	background-color: white;
	border-radius: 25px;
	cursor: pointer;
	a {
		text-decoration: none;
		font-weight: bold;
		color: #333;
		transition: ease all 0.3s;
		&:hover {
			color: #ef5350;
			text-decoration: underline;
		}
	}
	span {
		display: inline-block;
		transition: ease all 0.3s;
		color: pink;
		&:hover {
			transform: scale(1.2);
		}
	}
}

/********************************************/
/********************************************/
/* Please ❤ this if you like it! */
/* Follow Me https://codepen.io/designfenix */
/********************************************/
/********************************************/
/**/
/**/
/**/
/**/
/**/
/**/
/**/
/**/
/**/
/**/
/**/
/**/
/**/
/**/

<div class="content">
  <h1 class="title">the beautiful aurora
    <div class="aurora">
      <div class="aurora__item"></div>
      <div class="aurora__item"></div>
      <div class="aurora__item"></div>
      <div class="aurora__item"></div>
    </div>
  </h1>
  <p class="subtitle">Made with love and only the CSS.</p>
</div>

@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;800&display=swap");

:root {
  --bg: #000000;
  --clr-1: #00c2ff;
  --clr-2: #33ff8c;
  --clr-3: #ffc640;
  --clr-4: #e54cff;

  --blur: 1rem;
  --fs: clamp(3rem, 8vw, 7rem);
  --ls: clamp(-1.75px, -0.25vw, -3.5px);
}

body {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background-color: var(--bg);
  color: #fff;
  font-family: "Inter", "DM Sans", Arial, sans-serif;
}

*,
*::before,
*::after {
  font-family: inherit;
  box-sizing: border-box;
}

.content {
  text-align: center;
}

.title {
  font-size: var(--fs);
  font-weight: 800;
  letter-spacing: var(--ls);
  position: relative;
  overflow: hidden;
  background: var(--bg);
  margin: 0;
}

.subtitle {
}

.aurora {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  mix-blend-mode: darken;
  pointer-events: none;
}

.aurora__item {
  overflow: hidden;
  position: absolute;
  width: 60vw;
  height: 60vw;
  background-color: var(--clr-1);
  border-radius: 37% 29% 27% 27% / 28% 25% 41% 37%;
  filter: blur(var(--blur));
  mix-blend-mode: overlay;
}

.aurora__item:nth-of-type(1) {
  top: -50%;
  animation: aurora-border 6s ease-in-out infinite,
    aurora-1 12s ease-in-out infinite alternate;
}

.aurora__item:nth-of-type(2) {
  background-color: var(--clr-3);
  right: 0;
  top: 0;
  animation: aurora-border 6s ease-in-out infinite,
    aurora-2 12s ease-in-out infinite alternate;
}

.aurora__item:nth-of-type(3) {
  background-color: var(--clr-2);
  left: 0;
  bottom: 0;
  animation: aurora-border 6s ease-in-out infinite,
    aurora-3 8s ease-in-out infinite alternate;
}

.aurora__item:nth-of-type(4) {
  background-color: var(--clr-4);
  right: 0;
  bottom: -50%;
  animation: aurora-border 6s ease-in-out infinite,
    aurora-4 24s ease-in-out infinite alternate;
}

@keyframes aurora-1 {
  0% {
    top: 0;
    right: 0;
  }

  50% {
    top: 100%;
    right: 75%;
  }

  75% {
    top: 100%;
    right: 25%;
  }

  100% {
    top: 0;
    right: 0;
  }
}

@keyframes aurora-2 {
  0% {
    top: -50%;
    left: 0%;
  }

  60% {
    top: 100%;
    left: 75%;
  }

  85% {
    top: 100%;
    left: 25%;
  }

  100% {
    top: -50%;
    left: 0%;
  }
}

@keyframes aurora-3 {
  0% {
    bottom: 0;
    left: 0;
  }

  40% {
    bottom: 100%;
    left: 75%;
  }

  65% {
    bottom: 40%;
    left: 50%;
  }

  100% {
    bottom: 0;
    left: 0;
  }
}

@keyframes aurora-4 {
  0% {
    bottom: -50%;
    right: 0;
  }

  50% {
    bottom: 0%;
    right: 40%;
  }

  90% {
    bottom: 50%;
    right: 25%;
  }

  100% {
    bottom: -50%;
    right: 0;
  }
}

@keyframes aurora-border {
  0% {
    border-radius: 37% 29% 27% 27% / 28% 25% 41% 37%;
  }

  25% {
    border-radius: 47% 29% 39% 49% / 61% 19% 66% 26%;
  }

  50% {
    border-radius: 57% 23% 47% 72% / 63% 17% 66% 33%;
  }

  75% {
    border-radius: 28% 49% 29% 100% / 93% 20% 64% 25%;
  }

  100% {
    border-radius: 37% 29% 27% 27% / 28% 25% 41% 37%;
  }
}

<h1 class="text">
        <span class="letter letter-1">N</span>
        <span class="letter letter-2">E</span>
        <span class="letter letter-3">O</span>
        <span class="letter letter-4">N</span>
    </h1>

$prime: #FF6E48
$second: #1b2431

@font-face
    font-family: "Liberty"
    src: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/907368/liberty.otf')

body, html
    margin: 0
    padding: 0
    width: 100%
    height: 100%

*
    box-sizing: border-box

body
    background-color: $second
    font-size: 10px
    display: flex
    flex-flow: column
    justify-content: center
    align-items: center

    .text
        font-family: 'Liberty'
        font-weight: 100
        font-size: 7rem
        letter-spacing: -0.25em
        flex-flow: row

        .letter
            color: #d9fdff
            text-shadow: 0 0 2rem #00f0ff
            display: inline-block

            &.letter-2
                transform: translate(-0.2rem, 1rem) rotate(10deg)
                animation: flicker 2s ease-in-out infinite alternate

@keyframes flicker
    0%
        opacity: 1
        transform: translate(-0.2rem, 1rem) rotate(10deg)
    5%
        opacity: 1
        transform: translate(-0.2rem, 1rem) rotate(10deg)
    5.5%
        opacity: 0
        transform: translate(-0.2rem, 1rem) rotate(10deg)
    6%
        opacity: 1
        transform: translate(-0.2rem, 1rem) rotate(10deg)
    6.5%
        opacity: 1
        transform: translate(-0.2rem, 1rem) rotate(10deg)
    7%
        opacity: 0
        transform: translate(-0.2rem, 1rem) rotate(10deg)
    8%
        opacity: 1
        transform: translate(-0.2rem, 1rem) rotate(10deg)
    50%
        opacity: 1
        transform: translate(-0.2rem, 1rem) rotate(13deg)
    100%
        opacity: 1
        transform: translate(-0.2rem, 1rem) rotate(10deg)

<head>

<!-- Code snippet to create a "breathe" animation effect with a variable font -->
  <style> 
    /* The @font-face rule is used to define a custom font that you want to use on your webpage. Here 'TheFont' is a name we give to reference the font later in CSS. The 'src' property specifies the path to the font file, and 'format' specifies the font format. */
    @font-face {
    font-family: 'TheFont';
    
    /* Variable fonts like the one linked below allow for fine-tuned control over various font properties dynamically via CSS, such as weight ('wght'), width ('wdth'), etc. This link is where your web browser will download the font from. */
    /* Insert the link to your custom variable font */
    src: url("https://garet.typeforward.com/assets/fonts/shared/TFMixVF.woff2")
      format('woff2'); }


  body.breathe-animation {
    display: flex;
    align-items: center;
    justify-content: center;
    /* Change the Background color of the entire screen */
    background-color: black;
    /* 'vw' is a viewport-width unit, 'vh' is a viewport-height unit. 1vw equals 1% of the width of the viewport, and 1vh equals 1% of the height of the viewport. This allows the font size to scale dynamically with the window size. */
    height: 100vh;
  }

  .breathe-animation span {
    font-family: 'TheFont';
  
    /* The 'clamp()' function sets a flexible font size that will never go below a minimum value and never above a maximum value. The middle value is preferred, but it will shrink or grow based on the viewport dimensions. */
    /* Adjusts font size based on content width and viewport height */
    font-size: clamp(10vw, 20vw, 50vh);
  
    /* Change this to set the text color */
    color: white;
  
    /* Center text horizontally */
    text-align: center; 
  
    /* The 'animation' property applies the 'letter-breathe' keyframes to the element, making it animate over 3 seconds.'ease-in-out' makes the movement start and end slowly, and 'infinite' makes it repeat forever. */
    /* Controls the animation (3s is the duration) */
    animation: letter-breathe 3s ease-in-out infinite;
}
  
  /* Keyframes define the sequence of styles that an element will go through during an animation. */
  @keyframes letter-breathe {
   
    /* The 'from' and 'to' keyframes establish the initial and final states of the animation, respectively, using 'font-variation-settings'. This CSS property is used with variable fonts to adjust their weight ('wght'), width ('wdth'), etc., during the animation. */
    from,
    to {
      /* Starting weight; adjust the numbers according to your specific font */
      font-variation-settings: 'wght' 100;
    }

    /* At the midpoint (50%) of the animation, the font weight changes to 900. */
    50% {
      /* Ending weight; adjust the numbers according to your specific font */
      font-variation-settings: 'wght' 900;
    }
  }
  </style>
</head>

<body class="breathe-animation">
  <!-- Change this letter to test a different one -->
  <span>mix</span>
</body>

<div class="content">
  
  <div class="marquee">
    <div class="marquee_blur" aria-hidden="true">
      <p class="marquee_text">Lorem ipsum dolor sit amet!</p>
    </div>
    <div class="marquee_clear">
      <p class="marquee_text">Lorem ipsum dolor sit amet!</p>
    </div>
  </div>

  <p class="text">
    I wanted to make a Gooey Marquee type effect, tried a couple of things, and ended up using two layers of text, one with the effect, and a clean one on top so that the text remains readable.
  </p>
</div>

@import url("https://fonts.googleapis.com/css?family=Raleway:400,400i,700");

*, *::before, *::after {
    padding: 0;
    margin: 0 auto;
    box-sizing: border-box;
}

body {
  font-family: Raleway, sans-serif;
  background-color: #000;
  color: #fff;
  font-size: 24px;
}

.content {
  width: 95%;
  max-width: 40ch;
  padding: 3em 1em;
}

.marquee {
  position: relative;
  width: 100%;
  height: 2em;
  font-size: 5em;
  display: grid;
  place-items: center;
  overflow: hidden;

  &_text {
    position: absolute;
    min-width: 100%;
    white-space: nowrap;
    animation: marquee 16s infinite linear;
    
    @keyframes marquee {
      from { translate: 70%; }
      to { translate: -70%; }
    }
  }

  &_blur {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    background-color: black;
    background-image:
      linear-gradient(to right, white, 1rem, transparent 50%),
      linear-gradient(to left, white, 1rem, transparent 50%);
    filter: contrast(15);
    
    p {
      filter: blur(0.07em);
    }
  }
  
  &_clear {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
  }
}

.text {
  margin-block: 2em;
}
