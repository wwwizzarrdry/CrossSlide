$(function() {
	var $test1 = $('#test1'),
		$test2 = $('#test2'),
		$test3 = $('#test3'),
		$test4 = $('#test4'),
		$caption = $('div.caption'),
		$pause = $('#pause'),
		$resume = $('#resume'),
		$freeze = $('#freeze'),
		$stop = $('#stop'),
		$restart = $('#restart'),
		STOP = 1, RUN = 2, PAUSE = 3;

	$test1.crossSlide({
		sleep: 2,
		fade: 1
	}, [
		{ src: 'img_0130.jpg' },
		{ src: 'img_0138.jpg'   },
		{ src: 'img_0140.jpg'  },
		{ src: 'img_0141.jpg' }
	]);

	$test2.crossSlide({
		speed: 45,
		fade: 1
	}, [
		{ src: 'img_0130.jpg', dir: 'up'   },
		{ src: 'img_0138.jpg',   dir: 'down' },
		{ src: 'img_0140.jpg',  dir: 'up'   },
		{ src: 'img_0141.jpg', dir: 'down' }
	]);

	$test3.crossSlide({
		fade: 1
	}, [
		{
			src:  'img_0130.jpg',
			alt:  'Sand Castle',
			from: '100% 80% 1x',
			to:   '100% 0% 1.7x',
			time: 13
		}, {
			src:  'img_0138.jpg',
			alt:  'Sunflower',
			from: 'top left',
			to:   'bottom right 1.5x',
			time: 13
		}, {
			src:  'img_0140.jpg',
			alt:  'Flip Flops',
			from: '100% 80% 1.5x',
			to:   '80% 0% 1.1x',
			time: 13
		}, {
			src:  'img_0141.jpg',
			alt:  'Rubber Ring',
			from: '100% 50%',
			to:   '30% 50% 1.5x',
			time: 13
		}
	], function(idx, img, idxOut, imgOut) {
		if (idxOut == undefined) {
			$caption.text(img.alt).animate({ opacity: .7 })
		} else {
			$caption.animate({ opacity: 0 })
		}
	});
	$caption.show().css({ opacity: 0 })

	function state(state) {
		$pause.attr('disabled', state != RUN);
		$resume.attr('disabled', state != PAUSE);
		$freeze.attr('disabled', state == STOP);
		$stop.attr('disabled', state == STOP);
	}
	state(RUN);

	$pause.click(function() {
		$test3.crossSlidePause();
		state(PAUSE);
	});

	$resume.click(function() {
		$test3.crossSlideResume();
		state(RUN);
	})

	$freeze.click(function() {
		$test3.crossSlideFreeze();
		state(STOP);
	});

	$stop.click(function() {
		$test3.crossSlideStop();
		$caption.css({ opacity: 0 })
		state(STOP);
	});

	$restart.click(function() {
		$test3.crossSlideRestart();
		state(RUN);
	});

	$test4.crossSlide({
		fade: 1,
		variant: true,
		easing: 'easeInOutQuad'
	}, [
		{
			src:  'img_0130.jpg',
			from: '100% 80% 1x',
			to:   '100% 0% 1.5x',
			time: 4
		}, {
			src:  'img_0138.jpg',
			from: 'top left',
			to:   'bottom right 1.5x',
			time: 4
		}, {
			src:  'img_0140.jpg',
			from: '100% 80% 1.5x',
			to:   '80% 0%',
			time: 4
		}, {
			src:  'img_0141.jpg',
			from: '100% 50%',
			to:   '30% 50% 1.5x',
			time: 4
		}
	]);
});
