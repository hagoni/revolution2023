(() => {

  history.scrollRestoration = "manual"
  // history.scrollRestoration = "auto"

	let yOffset = 0; // window.pageYOffset 대신 쓸 변수
	let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
	let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)

  const sceneInfo = [
		{
			// 0
			type: 'sticky',
			heightNum: 1, // 브라우저 높이의 1배로 scrollHeight 세팅
			scrollHeight: 0,
      objs: {
				container: document.querySelector('#scroll-section-0'),
      }
		},
		{
			// 1
			type: 'sticky',
			heightNum: 6, // 브라우저 높이의 6배로 scrollHeight 세팅
			scrollHeight: 0,
      objs: {
				container: document.querySelector('#scroll-section-1'),
        messageA: document.querySelector('.story .text.a'),
        messageB: document.querySelector('.story .text.b'),
        messageC: document.querySelector('.story .text.c'),
        messageD: document.querySelector('.story .text.d'),
        messageE: document.querySelector('.story .text.e'),
        colon: document.querySelector('.story .title .colon'),
        title: document.querySelector('.story .title'),
        video: document.querySelector('#story_vid_1'),
        barLeft: document.querySelector('.bar_left'),
        barRight: document.querySelector('.bar_right'),
        overlay: document.querySelector('.story .overlay'),
        inner: document.querySelector('.story .inner'),
      },
      values: {
        messageA_opacity_in: [0, 1, { start: 0.1, end: 0.3 }],
        messageB_opacity_in: [0, 1, { start: 1.1, end: 1.3 }],
        messageC_opacity_in: [0, 1, { start: 2.1, end: 2.3 }],
        messageD_opacity_in: [0, 1, { start: 3.1, end: 3.3 }],
        messageE_opacity_in: [0, 1, { start: 4.1, end: 4.3 }],
        colon_opacity_in: [0, 1, { start: 2.2, end: 2.35} ],
        overlay_opacity_in: [0, 0.8, { start: -0.9, end: -0.1} ],
				messageA_translateY_in: [40, 0, { start: 0.1, end: 0.3 }],
        messageB_translateY_in: [40, 0, { start: 1.1, end: 1.3 }],
        messageC_translateY_in: [40, 0, { start: 2.1, end: 2.3 }],
        messageD_translateY_in: [40, 0, { start: 3.1, end: 3.3 }],
        messageE_translateY_in: [0, 0, { start: 3.1, end: 3.1 }],
        colon_width_in: [0, 33, { start: 2.1, end: 2.35 }],
        overlay_change_in: [0.8, 1, { start: 1.8, end: 2 }],
        overlay_change_out: [1, 0.8, { start: 2, end: 2.2 }],
        
				messageA_opacity_out: [1, 0, { start: 0.6, end: 0.8 }],
				messageB_opacity_out: [1, 0, { start: 1.6, end: 1.8 }],
				messageC_opacity_out: [1, 0, { start: 2.6, end: 2.8 }],
				messageD_opacity_out: [1, 0, { start: 3.6, end: 3.8 }],
				messageE_opacity_out: [1, 0, { start: 4.6, end: 4.8 }],
        title_opacity_out: [1, 0, { start: 4.6, end: 4.8 }],
        video_opacity_out: [1, 0, { start: 4.1, end: 4.3 }],
				messageA_translateY_out: [0, -50, { start: 0.6, end: 0.9 }],
				messageB_translateY_out: [0, -50, { start: 1.6, end: 1.9 }],
				messageC_translateY_out: [0, -50, { start: 2.6, end: 2.9 }],
				messageD_translateY_out: [0, -50, { start: 3.6, end: 3.9 }],
        bar_width_out: [10.4, 0, { start: -0.7, end: -0.2}],
      }
		},
    {
			// 2
			type: 'normal',
			heightNum: 1, // 브라우저 높이의 2배로 scrollHeight 세팅
			scrollHeight: 0,
      objs: {
				container: document.querySelector('#scroll-section-2'),
        slideList: document.querySelector('.slide .slide_list'),
        slideImageA: document.querySelector('.slide .slide_item.a .img_area'),
        slideImageB: document.querySelector('.slide .slide_item.b .img_area'),
        slideImageC: document.querySelector('.slide .slide_item.c .img_area'),
        slideTitleA: document.querySelector('.slide .slide_item.a .img_area .slide_title'),
        slideTitleB: document.querySelector('.slide .slide_item.b .img_area .slide_title'),
        slideTitleC: document.querySelector('.slide .slide_item.c .img_area .slide_title'),
        slideTextA: document.querySelector('.slide .slide_item.a .text_area'),
        slideTextB: document.querySelector('.slide .slide_item.b .text_area'),
        slideTextC: document.querySelector('.slide .slide_item.c .text_area'),
      },
      values: {
        slideA_opacity_in: [0.5, 1, { start: 0.51, end: 0.51 }],
        slideB_opacity_in: [0.5, 1, { start: 1.01, end: 1.01 }],
        slideC_opacity_in: [0.5, 1, { start: 1.51, end: 1.55 }],
        titleA_opacity_in: [0, 1, { start: 0.51, end: 0.51 }],
        titleB_opacity_in: [0, 1, { start: 1.01, end: 1.01 }],
        titleC_opacity_in: [0, 1, { start: 1.51, end: 1.51 }],
        textA_opacity_in: [0, 1, { start: 0.51, end: 0.51 }],
        textB_opacity_in: [0, 1, { start: 1.01, end: 1.01 }],
        textC_opacity_in: [0, 1, { start: 1.51, end: 1.51 }],
        titleA_transform_in: [50, 0, { start: 0.51, end: 0.51 }],
        titleB_transform_in: [50, 0, { start: 1.01, end: 1.01 }],
        titleC_transform_in: [50, 0, { start: 1.51, end: 1.51 }],
        textA_transform_in: [50, 0, { start: 0.51, end: 0.51 }],
        textB_transform_in: [50, 0, { start: 1.01, end: 1.01 }],
        textC_transform_in: [50, 0, { start: 1.51, end: 1.51 }],

        slideA_opacity_out: [1, 0.5, { start: 0.9, end: 0.9 }],
        slideB_opacity_out: [1, 0.5, { start: 1.4, end: 1.4 }],
        slideC_opacity_out: [1, 0.5, { start: 1.9, end: 1.9 }],
        titleA_opacity_out: [1, 0, { start: 0.9, end: 0.9 }],
        titleB_opacity_out: [1, 0, { start: 1.4, end: 1.4 }],
        titleC_opacity_out: [1, 0, { start: 1.9, end: 1.9 }],
        textA_opacity_out: [1, 0, { start: 0.9, end: 0.9 }],
        textB_opacity_out: [1, 0, { start: 1.4, end: 1.4 }],
        textC_opacity_out: [1, 0, { start: 1.9, end: 1.9 }],
        titleA_transform_out: [0, 50, { start: 0.9, end: 0.9 }],
        titleB_transform_out: [0, 50, { start: 1.4, end: 1.4 }],
        titleC_transform_out: [0, 50, { start: 1.9, end: 1.9 }],
        textA_transform_out: [0, 50, { start: 0.9, end: 0.9 }],
        textB_transform_out: [0, 50, { start: 1.4, end: 1.4 }],
        textC_transform_out: [0, 50, { start: 1.9, end: 1.9 }],

        slide_translateX_once: [730, 0, { start: 1, end: 1 }],
        slide_translateX_twice: [0, -730, { start: 1.5, end: 1.5 }],
      },
		},
    {
			// 3
			type: 'normal',
			heightNum: 1, // 브라우저 높이의 1배로 scrollHeight 세팅
			scrollHeight: 0,
      objs: {
				container: document.querySelector('#scroll-section-3'),
        title: document.querySelector('.attend .title'),
      },
      values: {
        title_opacity_in: [0.3, 1, { start: 8.6, end: 8.9 }],
        title_transform_in: [-467, 0, { start: 8.6, end: 8.9 }],
      },
		},
    {
			// 4
			type: 'normal',
			heightNum: 1, // 브라우저 높이의 1배로 scrollHeight 세팅
			scrollHeight: 0,
      objs: {
				container: document.querySelector('#scroll-section-4'),
        title: document.querySelector('.session .title_area'),
      },
      values: {
        title_opacity_in: [0.3, 1, { start: 8.9, end: 9.3 }],
        title_transform_in: [203, 0, { start: 8.9, end: 9.3 }],
      },
		},
	];

  // 각 스크롤 섹션의 높이 세팅
  const setLayout = () => {
		for (let i = 0; i < sceneInfo.length; i++) {
      if(sceneInfo[i].type == 'sticky') {
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
        sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
      }
		}
	}

  function anchorScroll() {
    document.querySelectorAll('a[data-anchor="scroll"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        
        let menuName = anchor.getAttribute('href').slice(1);
        
        if(document.querySelector(`.anchor-${menuName}`)){
          let moveLocation = document.querySelector(`.anchor-${menuName}`).offsetTop;
          
          if(document.querySelector('header.mobile')){
            const header = document.querySelector('header.mobile').getBoundingClientRect();
            window.innerWidth > 768 ? window.scrollTo({ top: moveLocation - header.height, behavior: 'smooth' }) : window.scrollTo({ top: moveLocation - header.height });
          }else{
            window.innerWidth > 768 ? window.scrollTo({ top: moveLocation, behavior: 'smooth' }) : window.scrollTo({ top: moveLocation });
          }
  
        }
  
      });
    });
  }
  
  anchorScroll();
  
  // 메인 영상 full
  const mainVideoRatio = () => {
    const mainVisual = document.querySelector('.main_visual');
    const videoArea = document.querySelector('.main_visual .video_area');
    const videos = document.querySelectorAll('.main_visual video');
    const boxHeight = mainVisual.getBoundingClientRect().height,  // 부모박스의 높이
    boxWidth = mainVisual.getBoundingClientRect().width,	// 부모박스의 너비
    boxRatio = boxHeight / boxWidth,
    stanRatio = 1080/1920;  // 영상의 height/width
    if(boxRatio >= stanRatio){
      videoArea.style.width = `${boxHeight / stanRatio}px`;
      videoArea.style.height = `${boxHeight}px`;
      videos.forEach(el => {
        el.style.width = `${boxHeight / stanRatio}px`;
        el.style.height = `${boxHeight}px`;
      });
    } else if(boxRatio < stanRatio) {
      videoArea.style.width = `${boxWidth}px`;
      videoArea.style.height = `${boxWidth * stanRatio}px`;
      videos.forEach(el => {
        el.style.width = `${boxWidth}px`;
        el.style.height = `${boxWidth * stanRatio}px`;
      });
    }
  }
  
  // 메인 스크롤 버튼 애니메이션
  const mainScrollButton = () => {
    const mainScrollBtn = document.querySelector('.main_visual .scroll_btn');
    const mainScrollIcon = document.querySelector('.main_visual .scroll_btn i');
    mainScrollBtn.style.opacity = '1';
    const stanRatio = 1080/1920;  // 영상의 height/width
    const browserRatio = innerHeight / innerWidth;
    if(browserRatio <= stanRatio) {
      mainScrollBtn.style.bottom = '15.07vh';
    } else {
      mainScrollBtn.style.bottom = '20.07vh';
    }
  }
  
  // 메인 텍스트 인터렉션
  const mainInteraction = () => {
    const mainTitle = document.querySelector('.main_visual .mv_title');
    const mainLocation = document.querySelector('.main_visual .mv_location');
    const mainDate = document.querySelector('.main_visual .mv_date');
    const mainButton = document.querySelector('.main_visual .mv_btn.btn_pc');
    mainTitle.style.transform = 'translate3d(0, 0, 0)';
    mainTitle.style.opacity = '1';
    mainTitle.style.filter ='blur(0)';
    mainLocation.style.transform = 'translate3d(0, 0, 0)';
    mainLocation.style.opacity = '1';
    mainLocation.style.filter ='blur(0)';
    mainDate.style.transform = 'translate3d(0, 0, 0)';
    mainDate.style.opacity = '1';
    mainDate.style.filter ='blur(0)';
    mainButton.style.transform = 'translate3d(0, 0, 0)';
    mainButton.style.opacity = '1';
    mainButton.style.filter ='blur(0)';
  }
  
  // 메인 영상 재생
  const mainVideoHandler = () => {
    const html = document.querySelector('html');
    const body = document.querySelector('body');
    const videoIntro = document.querySelector('#mv_video_intro');
    const videoLoop = document.querySelector('#mv_video_loop');
    const header = document.querySelector('header.pc');
    const textArea = document.querySelector('.main_visual .mv_text_area')
    const mainScrollBtn = document.querySelector('.main_visual .scroll_btn');
    let counter = 0;
    let videoPlayed = 0;  
    
    if(scrollY <= 30 && counter === 0) {
      // scroll 안보이게
      // const scrollHidden = () => {
      //   html.style.overflow = 'hidden';
      //   html.style.height = '100%';
      //   body.style.overflow = 'hidden';
      //   body.style.height = '100%';
      // }
      // scrollHidden();
  
      // // scroll 보이게
      // const scrollVisible = () => {
      //   html.style.overflow = 'visible';
      //   html.style.height = 'auto';
      //   body.style.overflow = 'visible';
      //   body.style.height = 'auto';
      // }
  
      // 시작
      window.addEventListener('wheel', () => {
        if(videoPlayed == 0) {
          videoIntro.play();
          setTimeout(() => {
            document.querySelector('.main_visual .video_overlay').style.opacity = 0.3;
          }, 3000);
          setTimeout(() => {header.style.opacity = '1'}, 3500);
          header.style.display = 'flex';
          textArea.style.display = 'block';
          setTimeout(mainInteraction, 3500);
          mainScrollBtn.style.opacity = 0;
          
        }
        // intro 영상이 끝났는 지 판별
        const pauseDetector = () => {
          if(videoIntro.paused) {
            videoLoop.play();
            setTimeout(() => {
              document.querySelector('body').classList.remove('no-scroll');
            }, 1000);
            videoPlayed = 1;
            videoIntro.style.opacity = 0;
            clearInterval(interval);
          }
        }
        let interval = setInterval(pauseDetector, 100);
      });
    } else {
      header.style.opacity = '1'
      header.style.display = 'flex';
    }
  }
  
  // 스토리 영상 full
  const storyVideoRatio = () => {
    const story = document.querySelector('.story .video_fixed');
    const videoArea = document.querySelector('.story .videos_wrap');
    const videos = document.querySelectorAll('.story video');
    const boxHeight = story.getBoundingClientRect().height,  // 부모박스의 높이
    boxWidth = story.getBoundingClientRect().width,	// 부모박스의 너비
    boxRatio = boxHeight / boxWidth,
    stanRatio = 1080/1920;  // 영상의 height/width
    if(boxRatio >= stanRatio){
      videoArea.style.width = `${boxHeight / stanRatio}px`;
      videoArea.style.height = `${boxHeight}px`;
      videos.forEach(el => {
        el.style.width = `${boxHeight / stanRatio}px`;
        el.style.height = `${boxHeight}px`;
      });
    } else if(boxRatio < stanRatio) {
      videoArea.style.width = `${boxWidth}px`;
      videoArea.style.height = `${boxWidth * stanRatio}px`;
      videos.forEach(el => {
        el.style.width = `${boxWidth}px`;
        el.style.height = `${boxWidth * stanRatio}px`;
      });
    }
  }
  
  //스토리 시작 영상 좌우 흑백 영역 조절 (매개변수는 시작 값 , 0~1 사이)
  // const storyVideoWidth = (initialWidth = 0.8) => {
  //   const videos = document.querySelectorAll('.story video');
  //   const matrixControl = (1 - initialWidth) / innerHeight;
  //   videos.forEach(el => {
  //     el.style.transform = `translate(-50%,-50%) matrix(${initialWidth + scrollY * matrixControl}, 0, 0, ${initialWidth + scrollY * matrixControl}, 0, 0)`;
  //   })
  //   window.addEventListener('scroll', () => {
  //     if(scrollY >= 0 && scrollY <= innerHeight) {
  //       videos.forEach(el => {
  //       el.style.transform = `translate(-50%,-50%) matrix(${initialWidth + scrollY * matrixControl}, 0, 0, ${initialWidth + scrollY * matrixControl}, 0, 0)`;
  //     })
  //     }
  //   });
  // }

  // 스토리 fixed
  const storyFixed = () => {
    const story = document.querySelector('.story .inner');
    if (scrollY >= sceneInfo[0].scrollHeight && scrollY < sceneInfo[1].scrollHeight) {
      story.style.position = 'fixed';
    } else {
      story.style.position = 'relative';
    }
  }

  // 스토리 interaction
  const storyInteraction = () => {
    const story = document.querySelector('.story');
    const video0 = document.querySelector('#story_vid_1');
    // const video0 = document.querySelector('#story_vid_0');
    // const video1 = document.querySelector('#story_vid_1');
    const storyHeight = story.getBoundingClientRect().height / 6;
    let currentScene = 0;

    const title = document.querySelector('.story .title');

    if (scrollY < storyHeight) {
      video0.pause();
      title.style.opacity = 0;
    } else if (scrollY >= storyHeight && scrollY < storyHeight * 2) {
      // 스토리 1
      video0.play();
      title.style.opacity = 1;
      currentScene = 1;
    } else if (scrollY >= storyHeight * 2 && scrollY < storyHeight * 3) {
      title.style.opacity = 1;
      currentScene = 2;
    }
    else if (scrollY >= storyHeight * 3 && scrollY < storyHeight * 4) {
      title.style.opacity = 1;
      currentScene = 3;
    }
    else if (scrollY >= storyHeight * 4 && scrollY < storyHeight * 5) {
      currentScene = 4;
      title.style.opacity = 1;
    }
    else if (scrollY >= storyHeight * 5 && scrollY < storyHeight * 6) {
      video0.play();
      currentScene = 5;
      title.style.opacity = 1;
      video0.style.opacity = 0;
    } else if (scrollY > storyHeight * 6) {
      video0.pause();
    }

    const currentYOffset = scrollY - storyHeight;
    const scrollRatio = currentYOffset / storyHeight;

    function calcValues(values, currentYOffset) {
      let rv;
      // 현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
      if (values.length === 3) {
        // start ~ end 사이에 애니메이션 실행
        const partScrollStart = values[2].start * storyHeight;
        const partScrollEnd = values[2].end * storyHeight;
        const partScrollHeight = partScrollEnd - partScrollStart;
  
        if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
          rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
        } else if (currentYOffset < partScrollStart) {
          rv = values[0];
        } else if (currentYOffset > partScrollEnd) {
          rv = values[1];
        }
      } else {
        rv = scrollRatio * (values[1] - values[0]) + values[0];
      }
  
      return rv;
    }

    function playAnimation() {
      const objs = sceneInfo[1].objs;
		  const values = sceneInfo[1].values;
      switch (currentScene) {
        case 0:
          if (scrollRatio >= -1) {
            // in
            objs.barLeft.style.width = `${calcValues(values.bar_width_out, currentYOffset)}%`;
            objs.barRight.style.width = `${calcValues(values.bar_width_out, currentYOffset)}%`;
            objs.overlay.style.opacity = calcValues(values.overlay_opacity_in, currentYOffset);
          }
        case 1:
          if (scrollRatio <= 0.4) {
            // in
            objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
            objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
          } else {
            // out
            objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
            objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
          }
          // objs.messageA.style.opacity = 0;
          objs.messageB.style.opacity = 0;
          objs.messageC.style.opacity = 0;
          objs.messageD.style.opacity = 0;
          objs.messageE.style.opacity = 0;
          break;
        case 2:
          if (scrollRatio <= 1.4) {
            // in
            objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
            objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
          } else {
            // out
            objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
            objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
            // objs.overlay.style.opacity = calcValues(values.overlay_change_in, currentYOffset);
          }
          objs.messageA.style.opacity = 0;
          // objs.messageB.style.opacity = 0;
          objs.messageC.style.opacity = 0;
          objs.messageD.style.opacity = 0;
          objs.messageE.style.opacity = 0;
          break;
        case 3:
          if (scrollRatio <= 2.4) {
            // in
            objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
            objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
            objs.colon.style.opacity = calcValues(values.colon_opacity_in, currentYOffset);
            objs.colon.style.width = `${calcValues(values.colon_width_in, currentYOffset)}px`;
            // objs.overlay.style.opacity = calcValues(values.overlay_change_out, currentYOffset);
          } else {
            // out
            objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
            objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
            objs.colon.style.opacity = 1;
            objs.colon.style.width = '33px';
          }
          objs.messageA.style.opacity = 0;
          objs.messageB.style.opacity = 0;
          // objs.messageC.style.opacity = 0;
          objs.messageD.style.opacity = 0;
          objs.messageE.style.opacity = 0;
          break;
        case 4:
          if (scrollRatio <= 3.4) {
            // in
            objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
            objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
          } else {
            // out
            objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
            objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
          }
          objs.messageA.style.opacity = 0;
          objs.messageB.style.opacity = 0;
          objs.messageC.style.opacity = 0;
          // objs.messageD.style.opacity = 0;
          objs.messageE.style.opacity = 0;
          objs.colon.style.opacity = 1;
          objs.colon.style.width = '33px';
          break;
        case 5:
          if (scrollRatio <= 4.4) {
            // in
            objs.messageE.style.opacity = calcValues(values.messageE_opacity_in, currentYOffset);
            objs.messageE.style.transform = `translate3d(0, ${calcValues(values.messageE_translateY_in, currentYOffset)}%, 0)`;
            objs.video.style.opacity = calcValues(values.video_opacity_out, currentYOffset);
          } else {
            // out
            objs.messageE.style.opacity = calcValues(values.messageE_opacity_out, currentYOffset);
            objs.title.style.opacity = calcValues(values.title_opacity_out, currentYOffset);
          }
          objs.messageA.style.opacity = 0;
          objs.messageB.style.opacity = 0;
          objs.messageC.style.opacity = 0;
          objs.messageD.style.opacity = 0;
          // objs.messageE.style.opacity = 0;
          objs.colon.style.opacity = 1;
          objs.colon.style.width = '33px';
        break;
      }
    }
    playAnimation();
  }

  const slideSS = () => {
    const slide = document.querySelector('.slide');
    const slideInner = document.querySelector('.slide .inner');
    const PREVHEIGHT = sceneInfo[0].scrollHeight + sceneInfo[1].scrollHeight;
    const SLIDEHEIGHT = slide.getBoundingClientRect().height;
    let currentScroll = scrollY - PREVHEIGHT;
    const itemArray = [
      {
        objs: {
          listItem: document.querySelector('.slide .slide_list'),
          image: document.querySelector('.slide .slide_item.a .img_area'),
          title: document.querySelector('.slide .slide_item.a .img_area .slide_title'),
          text: document.querySelector('.slide .slide_item.a .text_area'),
        },
      },
      {
        objs: {
          listItem: document.querySelector('.slide .slide_list'),
          image: document.querySelector('.slide .slide_item.b .img_area'),
          title: document.querySelector('.slide .slide_item.b .img_area .slide_title'),
          text: document.querySelector('.slide .slide_item.b .text_area'),
        },
      },
      {
        objs: {
          listItem: document.querySelector('.slide .slide_list'),
          image: document.querySelector('.slide .slide_item.c .img_area'),
          title: document.querySelector('.slide .slide_item.c .img_area .slide_title'),
          text: document.querySelector('.slide .slide_item.c .text_area'),
        },
      },
    ]
    const slideOn = (index) => {
      itemArray[index].objs.image.style.opacity = '1';
      itemArray[index].objs.title.style.opacity = '1';
      itemArray[index].objs.title.style.transform = 'translate3d(0, 0, 0)';
      itemArray[index].objs.text.style.opacity = '1';
      itemArray[index].objs.text.style.transform = 'translate3d(0, 0, 0)';
    }
    const slideOff = (index) => {
      itemArray[index].objs.image.style.opacity = '0.5';
      itemArray[index].objs.title.style.opacity = '0';
      itemArray[index].objs.title.style.transform = 'translate3d(0, 50px, 0)';
      itemArray[index].objs.text.style.opacity = '0';
      itemArray[index].objs.text.style.transform = 'translate3d(0, 50px, 0)';
    }
    if(currentScroll < innerHeight / 3 && currentScroll > 0) {
      // 초기값
      itemArray[0].objs.listItem.style.transform = 'translate3d(730px, 0, 0)';
      slideOn(0);
      slideOff(1);
    }
    if(currentScroll >= innerHeight / 3 && currentScroll <= 2 * innerHeight / 3) {
      itemArray[0].objs.listItem.style.transform = 'translate3d(0, 0, 0)';
      slideOn(1);
      slideOff(0);
      slideOff(2);
    }
    if(currentScroll > 2 * innerHeight / 3 && currentScroll < innerHeight) {
      itemArray[0].objs.listItem.style.transform = 'translate3d(-730px, 0, 0)';
      slideOn(2);
      slideOff(1);
    }
    if(currentScroll > innerHeight) {
      slideInner.style.position = 'absolute';
      slideInner.style.bottom = 0;
      slideInner.style.top = 'auto';
    } else if (currentScroll <= innerHeight && currentScroll >= 0) {
      slideInner.style.position = 'fixed';
    } else if (currentScroll < 0) {
      slideInner.style.position = 'absolute';
      slideInner.style.bottom = 'auto';
      slideInner.style.top = 0;
    }
  }
  // slide interaction
  // const slideInteraction = () => {
  //   const slide = document.querySelector('.slide');
  //   const slideHeight = slide.getBoundingClientRect().height / 3;
  //   let currentScene = 0;

  //   let currentScroll = scrollY - (innerHeight * 6);

  //   if (currentScroll < slideHeight) {
  //   } else if (scrollY - (innerHeight * 6) >= slideHeight && scrollY - (innerHeight * 6) < slideHeight * 2) {
  //     currentScene = 1;
  //   } else if (scrollY - (innerHeight * 6) >= slideHeight * 2 && scrollY - (innerHeight * 6) < slideHeight * 3) {
  //     currentScene = 2;
  //   }

  //   const currentYOffset = currentScroll - slideHeight;
  //   const scrollRatio = currentScroll / slideHeight;

  //   function calcValues(values, currentYOffset) {
  //     let rv;
  //     // 현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
  //     if (values.length === 3) {
  //       // start ~ end 사이에 애니메이션 실행
  //       const partScrollStart = values[2].start * slideHeight;
  //       const partScrollEnd = values[2].end * slideHeight;
  //       const partScrollHeight = partScrollEnd - partScrollStart;
  
  //       if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
  //         rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
  //       } else if (currentYOffset < partScrollStart) {
  //         rv = values[0];
  //       } else if (currentYOffset > partScrollEnd) {
  //         rv = values[1];
  //       }
  //     } else {
  //       rv = scrollRatio * (values[1] - values[0]) + values[0];
  //     }
  
  //     return rv;
  //   }

  //   function playAnimation() {
  //     const objs = sceneInfo[2].objs;
  //     const values = sceneInfo[2].values;
  //     switch (currentScene) {
  //       case 1:
  //         if (scrollRatio <= 1.5) {
  //           objs.slideImageA.style.opacity = calcValues(values.slideA_opacity_in, currentYOffset);
  //           objs.slideTitleA.style.opacity = calcValues(values.titleA_opacity_in, currentYOffset);
  //           objs.slideTextA.style.opacity = calcValues(values.textA_opacity_in, currentYOffset);
  //           objs.slideTitleA.style.transform = `translate3d(0, ${calcValues(values.titleA_transform_in, currentYOffset)}px, 0)`;
  //           objs.slideTextA.style.transform = `translate3d(0, ${calcValues(values.textA_transform_in, currentYOffset)}px, 0)`;
  //           objs.slideImageA.style.opacity = calcValues(values.slideA_opacity_in, currentYOffset);
  //         } else {
  //           objs.slideImageA.style.opacity = calcValues(values.slideA_opacity_out, currentYOffset);
  //           objs.slideTitleA.style.opacity = calcValues(values.titleA_opacity_out, currentYOffset);
  //           objs.slideTextA.style.opacity = calcValues(values.textA_opacity_out, currentYOffset);
  //           objs.slideTitleA.style.transform = `translate3d(0, ${calcValues(values.titleA_transform_out, currentYOffset)}px, 0)`;
  //           objs.slideTextA.style.transform = `translate3d(0, ${calcValues(values.textA_transform_out, currentYOffset)}px, 0)`;
  //           objs.slideImageA.style.opacity = calcValues(values.slideA_opacity_out, currentYOffset);
  //         }
  //         if (scrollRatio <= 2) {
  //           if (scrollRatio > 1.5){
  //             objs.slideList.style.transform = `translate3d(${calcValues(values.slide_translateX_once, currentYOffset)}px, 0, 0)`;
  //           }
  //         }
  //       break;
  //       case 2:
  //         if (scrollRatio <= 3) {
  //           if(scrollRatio < 2.0) {
  //             objs.slideImageB.style.opacity = calcValues(values.slideB_opacity_in, currentYOffset);
  //             objs.slideTitleB.style.opacity = calcValues(values.titleB_opacity_in, currentYOffset);
  //             objs.slideTextB.style.opacity = calcValues(values.textB_opacity_in, currentYOffset);
  //             objs.slideTitleB.style.transform = `translate3d(0, ${calcValues(values.titleB_transform_in, currentYOffset)}px, 0)`;
  //             objs.slideTextB.style.transform = `translate3d(0, ${calcValues(values.textB_transform_in, currentYOffset)}px, 0)`;
  //             objs.slideImageB.style.opacity = calcValues(values.slideB_opacity_in, currentYOffset);

  //             // objs.slideImageA.style.opacity = 0.5;
  //             objs.slideImageB.style.opacity = 0.5;
  //             objs.slideImageC.style.opacity = 0.5;
  //             // objs.slideTitleA.style.opacity = 0;
  //             objs.slideTitleB.style.opacity = 0;
  //             objs.slideTitleC.style.opacity = 0;
  //             // objs.slideTextA.style.opacity = 0;
  //             objs.slideTextB.style.opacity = 0;
  //             objs.slideTextC.style.opacity = 0;
  //             // objs.slideTitleA.style.transform = 'translate3d(0, 0, 0)';
  //             objs.slideTitleB.style.transform = 'translate3d(0, 0, 0)';
  //             objs.slideTitleC.style.transform = 'translate3d(0, 0, 0)';
  //             // objs.slideTextA.style.transform = 'translate3d(0, 0, 0)';
  //             objs.slideTextB.style.transform = 'translate3d(0, 0, 0)';
  //             objs.slideTextC.style.transform = 'translate3d(0, 0, 0)';

  //           } else if(scrollRatio < 2.5) {
  //             objs.slideImageB.style.opacity = calcValues(values.slideB_opacity_out, currentYOffset);
  //             objs.slideTitleB.style.opacity = calcValues(values.titleB_opacity_out, currentYOffset);
  //             objs.slideTextB.style.opacity = calcValues(values.textB_opacity_out, currentYOffset);
  //             objs.slideTitleB.style.transform = `translate3d(0, ${calcValues(values.titleB_transform_out, currentYOffset)}px, 0)`;
  //             objs.slideTextB.style.transform = `translate3d(0, ${calcValues(values.textB_transform_out, currentYOffset)}px, 0)`;
  //             objs.slideImageB.style.opacity = calcValues(values.slideB_opacity_out, currentYOffset);


  //             objs.slideImageA.style.opacity = 0.5;
  //             // objs.slideImageB.style.opacity = 0.5;
  //             objs.slideImageC.style.opacity = 0.5;
  //             objs.slideTitleA.style.opacity = 0;
  //             // objs.slideTitleB.style.opacity = 0;
  //             objs.slideTitleC.style.opacity = 0;
  //             objs.slideTextA.style.opacity = 0;
  //             // objs.slideTextB.style.opacity = 0;
  //             objs.slideTextC.style.opacity = 0;
  //             objs.slideTitleA.style.transform = 'translate3d(0, 0, 0)';
  //             // objs.slideTitleB.style.transform = 'translate3d(0, 0, 0)';
  //             objs.slideTitleC.style.transform = 'translate3d(0, 0, 0)';
  //             objs.slideTextA.style.transform = 'translate3d(0, 0, 0)';
  //             // objs.slideTextB.style.transform = 'translate3d(0, 0, 0)';
  //             objs.slideTextC.style.transform = 'translate3d(0, 0, 0)';
  //           } else if (scrollRatio <= 2.8) {
  //             objs.slideImageC.style.opacity = calcValues(values.slideC_opacity_in, currentYOffset);
  //             objs.slideTitleC.style.opacity = calcValues(values.titleC_opacity_in, currentYOffset);
  //             objs.slideTextC.style.opacity = calcValues(values.textC_opacity_in, currentYOffset);
  //             objs.slideTitleC.style.transform = `translate3d(0, ${calcValues(values.titleC_transform_in, currentYOffset)}px, 0)`;
  //             objs.slideTextC.style.transform = `translate3d(0, ${calcValues(values.textC_transform_in, currentYOffset)}px, 0)`;
  //             objs.slideImageC.style.opacity = calcValues(values.slideC_opacity_in, currentYOffset);

  //             objs.slideImageA.style.opacity = 0.5;
  //             objs.slideImageB.style.opacity = 0.5;
  //             // objs.slideImageC.style.opacity = 0.5;
  //             objs.slideTitleA.style.opacity = 0;
  //             objs.slideTitleB.style.opacity = 0;
  //             // objs.slideTitleC.style.opacity = 0;
  //             objs.slideTextA.style.opacity = 0;
  //             objs.slideTextB.style.opacity = 0;
  //             // objs.slideTextC.style.opacity = 0;
  //             objs.slideTitleA.style.transform = 'translate3d(0, 0, 0)';
  //             objs.slideTitleB.style.transform = 'translate3d(0, 0, 0)';
  //             // objs.slideTitleC.style.transform = 'translate3d(0, 0, 0)';
  //             objs.slideTextA.style.transform = 'translate3d(0, 0, 0)';
  //             objs.slideTextB.style.transform = 'translate3d(0, 0, 0)';
  //             // objs.slideTextC.style.transform = 'translate3d(0, 0, 0)';
  //           } else {
  //             objs.slideImageC.style.opacity = calcValues(values.slideC_opacity_out, currentYOffset);
  //             objs.slideTitleC.style.opacity = calcValues(values.titleC_opacity_out, currentYOffset);
  //             objs.slideTextC.style.opacity = calcValues(values.textC_opacity_out, currentYOffset);
  //             objs.slideTitleC.style.transform = `translate3d(0, ${calcValues(values.titleC_transform_out, currentYOffset)}px, 0)`;
  //             objs.slideTextC.style.transform = `translate3d(0, ${calcValues(values.textC_transform_out, currentYOffset)}px, 0)`;
  //             objs.slideImageC.style.opacity = calcValues(values.slideC_opacity_out, currentYOffset);
  //           }
            
            
  //           objs.slideList.style.transform = `translate3d(${calcValues(values.slide_translateX_twice, currentYOffset)}px, 0, 0)`;
  //         } 
  //       break;
  //     }
  //   }
  //   playAnimation();
  // }

  // attend swiper
  const attendSwiper = () => {
    const swiper = new Swiper('.attend .swiper .swiper-container', {  
      spaceBetween: 40,
      navigation: {
        nextEl: '.attend .swiper-button-next',
        prevEl: '.attend .swiper-button-prev',
      },
    });
  }

  // attend interaction
  const attendInteraction = () => {
    const attend = document.querySelector('.attend');
    const attendOffsetY = attend.offsetTop;
    const attendHeight = attend.getBoundingClientRect().height;
    let currentScene = 0;

    const currentYOffset = scrollY - attendHeight;
    const scrollRatio = currentYOffset / attendHeight;

    if (scrollY < attendOffsetY) {
      currentScene = 0;
    } else if(scrollY >= attendHeight) {
      currentScene = 1;
    }

    function calcValues(values, currentYOffset) {
      let rv;
      // 현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
      if (values.length === 3) {
        // start ~ end 사이에 애니메이션 실행
        const partScrollStart = values[2].start * attendHeight;
        const partScrollEnd = values[2].end * attendHeight;
        const partScrollHeight = partScrollEnd - partScrollStart;
  
        if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
          rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
        } else if (currentYOffset < partScrollStart) {
          rv = values[0];
        } else if (currentYOffset > partScrollEnd) {
          rv = values[1];
        }
      } else {
        rv = scrollRatio * (values[1] - values[0]) + values[0];
      }
  
      return rv;
    }

    function playAnimation() {
      const objs = sceneInfo[3].objs;
		  const values = sceneInfo[3].values;
      switch (currentScene) {
        case 0:
          if(scrollRatio < 9 && scrollRatio >= 8) {
            // objs.title.style.opacity = calcValues(values.title_opacity_in, currentYOffset);
            // objs.title.style.transform = `translate3d(${calcValues(values.title_transform_in, currentYOffset)}px, 0, 0)`;
          }
          break;
      }

      // 수정 필요
      if(attend.getBoundingClientRect().top < innerHeight / 2) {
        objs.title.style.transition = '0.4s ease';
        objs.title.style.opacity = 1;
        objs.title.style.transform = 'translate3d(0, 0, 0)';
      } else {
        objs.title.style.transition = '0.4s ease';
        objs.title.style.opacity = 0.3;
        objs.title.style.transform = 'translate3d(-467px, 0, 0)';
      }
    }
    playAnimation();
  }

  const lists = document.querySelectorAll('.session_item');
  const images = document.querySelectorAll('.session .img_item');

  // SESSION IMAGE HOVER SLIDE IMAGE DOM MAKER
  const imgDelete = (index) => {
    images[index].style.transition = '0s ease';
    images[index].style.opacity = 0;
    images[index].classList.add('on');
    images[index].classList.add('active');

    images[index].style.transform = 'translate3d(300px, -30px, 0) rotate(20deg)';
  }
  
  const imgAdd = (index) => {
    images[index].style.transition = '0.5s ease';
    images[index].style.opacity = 1;
    images[index].style.transform = 'translate3d(0, 0, 0) rotate(0)';
  }

  const imgRotate = (index) => {
    for(let i = 0; i < images.length; i++) {
      if(i !== index) {
        images[i].style.transition = '0.2s ease';
        images[i].style.transform = `translate3d(0, 0, 0) rotate(${i * 2}deg)`;
      }
    }
  } 

  // SESSION IMAGE HOVER SLIDE
  const hoverSlide = () => {
    let counter = 3;

    lists.forEach((el, index) => {
      el.addEventListener('mouseenter', () => {
        if(!lists[index].classList.contains('on')) {
          // 현재 활성화 된 것이 아니면 (정상 작동을 의미)
          for(let i = 0; i < lists.length; i++) {
            if(i !== index) {
              lists[i].classList.remove('on');
              images[i].classList.remove('on');
            } else {
              images[i].style.zIndex = `${counter}`
            }
          }
          lists[index].classList.add('on');
          imgDelete(index);
          setTimeout(() => {imgAdd(index)}, 100);
          setTimeout(() => {
            images[index].classList.remove('active');
          }, 600)
          setTimeout(() => {imgRotate(index)});
        }
        counter++;
      });
    });
  }

  // session interaction
  const sessionInteraction = () => {
    const session = document.querySelector('.session');
    const sessionHeight = session.getBoundingClientRect().height;
    let currentScene = 0;

    const currentYOffset = scrollY - sessionHeight;
    const scrollRatio = currentYOffset / sessionHeight;

    function calcValues(values, currentYOffset) {
      let rv;
      // 현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
      if (values.length === 3) {
        // start ~ end 사이에 애니메이션 실행
        const partScrollStart = values[2].start * sessionHeight;
        const partScrollEnd = values[2].end * sessionHeight;
        const partScrollHeight = partScrollEnd - partScrollStart;
  
        if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
          rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
        } else if (currentYOffset < partScrollStart) {
          rv = values[0];
        } else if (currentYOffset > partScrollEnd) {
          rv = values[1];
        }
      } else {
        rv = scrollRatio * (values[1] - values[0]) + values[0];
      }
  
      return rv;
    }

    function playAnimation() {
      const objs = sceneInfo[4].objs;
		  const values = sceneInfo[4].values;
      switch (currentScene) {
        case 0:
          if(scrollRatio < 9.3 && scrollRatio >= 8.8) {
            // objs.title.style.opacity = calcValues(values.title_opacity_in, currentYOffset);
            // objs.title.style.transform = `translate3d(0, ${calcValues(values.title_transform_in, currentYOffset)}px, 0)`;
          }
          break;
      }

      // 수정 필요
      if(session.getBoundingClientRect().top < innerHeight / 2) {
        objs.title.style.transition = '0.4s ease';
        objs.title.style.opacity = 1;
        objs.title.style.transform = 'translate3d(0, 0, 0)';
      } else {
        objs.title.style.transition = '0.4s ease';
        objs.title.style.opacity = 0.3;
        objs.title.style.transform = 'translate3d(0, 203px, 0)';
      }
    }
    playAnimation();
  }

  // event 덮이게
  const eventFixed = () => {
    const event = document.querySelector('.event');
    const session = document.querySelector('.session');
    const sessionInner = document.querySelector('.session .fixed_inner');
    const fixedTrigger = event.offsetTop - innerHeight;

    session.style.height = `${session.getBoundingClientRect().height}px`;
    sessionInner.style.height = `${session.getBoundingClientRect().height}px`;
    if(scrollY >= fixedTrigger) {
      sessionInner.style.position = 'fixed';
    } else {
      sessionInner.style.position = 'relative';
    }
  }

  //modal script
  function modalHandler() {
      
    const dim = document.getElementById('dim');

    let btnModal = document.querySelectorAll('.btn_modal'),
        modal = document.querySelectorAll('.modal'),
        modalCloseBtn = document.querySelectorAll('.btn_close');

    btnModal.forEach(el => {
      el.onclick = () => {

        let elName = el.getAttribute('name');

        for(let i of modal) {
          if(i.attributes['name'].value == elName) {
            i.classList.add('on');
          }
        }

        dim.classList.add('on');
        document.body.style.overflow = 'hidden';
      }
    });

    // modal close BY BUTTON               
    modalCloseBtn.forEach(el => {
      el.onclick = () => {
        closeModal()
      }
    })

    window.onkeydown = (e) => { // escape key
      if (e.key === 'Escape') closeModal()
    };

  }
  modalHandler();

  // modal close ALL
  function closeModal() {
    const modal = document.querySelector('.modal.on'),
          dim = document.getElementById('dim');
    modal.classList.remove('on');
    dim.classList.remove('on');
    document.body.style.overflow = 'auto';
  }

  // form
  window.addEventListener('message', (event) => {
    // hubl form onReady - start
    if(event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormReady'){
      // change submit text - start
      const submitWrap = document.querySelectorAll('.actions');
      const div = document.createElement("div");
      div.innerHTML = `신청하기 <span>09. 13. 수. 23:59까지</span>`
      submitWrap.forEach(el => {
        el.appendChild(div);
      });
      // change submit text - end


      // modal - start
      const btnModal = document.querySelectorAll('.hs-form-booleancheckbox a[href="#modal"]');
      btnModal.forEach( (itm, idx) => {
        itm.classList.add('btn_modal');
        itm.setAttribute('name', 'modal_hubspot_0' + idx);
      });
      modalHandler();
      // modal - end
      
      // phone number dash - start
      const phoneFilter = document.querySelector('.hs_mobilephone input');
      phoneFilter.setAttribute("oninput", "hypenTel(this)");
      phoneFilter.setAttribute("maxlength", "13");
      // phone number dash - end
  
      // checkbox all select - start
      const checkboxDOM = document.querySelectorAll('.hs-fieldtype-booleancheckbox')[0];
      const checkboxTarget = document.querySelectorAll('.hs-form-booleancheckbox:not(#allBtn) .hs-input[type="checkbox"]');
      let counter = 0;
  
      const checkBtnAll = `<div class="hs-fieldtype-booleancheckbox box_selectAll"><label for="selectAll"><input type="checkbox" id="selectAll"><span>약관 전체동의</span></label></div>`;
      
      if(!document.querySelector('.box_selectAll')) checkboxDOM.insertAdjacentHTML('beforebegin', checkBtnAll);
  
      let allButton = document.querySelector('.box_selectAll input[type="checkbox"]');
  
      allButton.addEventListener('change', () => {
        for(let i = 0; i < checkboxTarget.length; i++) {
          checkboxTarget[i].checked = allButton.checked;
          checkboxTarget[i].dispatchEvent(new Event('input', { bubbles: true }));
        }
        if(allButton.checked) {
          counter = checkboxTarget.length;
        } else {
          counter = 0;
        }
      });
      
      checkboxTarget.forEach(el => {
        el.addEventListener('change', () => {
          if(!el.checked) {
            allButton.checked = el.checked;
            counter -= 1;
          }
          if(el.checked) {
            counter += 1;
            if(counter == checkboxTarget.length) {
              allButton.checked = true;
            }
          }
        });
      });
      // checkbox all select - end
    }
    // hubl form onReady - end
  
    // hubl form onSubmitted - start
    if(event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormSubmitted') {
      document.querySelector('.form').style.height = '884px';
      if(document.querySelector('.form .form_modal.active')) {
        document.querySelector('.form .form_modal.active').style.height = '775px';
      }
      document.querySelector('.form_inner').style.display = "none";
      document.querySelector('.submit').style.display = "block";
    }
    // hubl form onSubmitted - end
  });

  // Q&A
  const qnaTabHandler = () => {
    const tab = document.querySelectorAll('.qna .tab');
    const content = document.querySelectorAll('.qna .content');
    tab[0].addEventListener('click', () => {
      tab[0].classList.add('on');
      tab[1].classList.remove('on');
      content[0].classList.add('on');
      content[1].classList.remove('on');
    });
    tab[1].addEventListener('click', () => {
      tab[1].classList.add('on');
      tab[0].classList.remove('on');
      content[1].classList.add('on');
      content[0].classList.remove('on');
    });
  }
  const qnaListHandler = () => {
    const lists = document.querySelectorAll('.qna .content_wrap li');
    lists.forEach(el => {
      el.addEventListener('click', () => {
        el.classList.toggle('on');
      })
    })
  }

  // footerFixed
  const footerFixed = () => {
    const fixedPoint = document.querySelector('.form');
    const footer = document.querySelector('#footer');
    if(scrollY > fixedPoint.offsetTop + fixedPoint.getBoundingClientRect().height / 2) {
      footer.style.position = 'fixed';
    } else {
      footer.style.position = 'absolute';
    }
  }

  // formModal
  const formModal = () => {
    
    const formBtn = document.querySelectorAll('.form_btn');
    const form = document.querySelector('.form .form_modal');
    const formDim = document.getElementById('form_dim');
    const close = document.querySelector('.form_close');

    if(innerHeight <= 1077 && form.classList.contains('active')) {
      form.classList.add('active_res');
      form.style.height = `${innerHeight - 72}px`;
    } else if(innerHeight > 1077 && form.classList.contains('active')) {
      if (form.classList.contains('active_res')) {
        form.classList.remove('active_res');
        form.style.height = '1005px';
      }
    } else {
      form.classList.remove('active_res');
      form.classList.remove('active');
      form.style.height = '1005px';
    }

    formBtn.forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        formDim.classList.add('on');
        if(innerHeight <= 1077) {
          form.classList.add('active');
          form.classList.add('active_res');
          form.style.height = `${innerHeight - 72}px`;
        } else {
          form.classList.add('active');
        }
      });
    });
    close.addEventListener('click', (e) => {
      e.preventDefault();
      formDim.classList.remove('on');
      form.classList.remove('active');
      form.classList.remove('active_res');
    });
    formDim.addEventListener('click', (e) => {
      e.preventDefault();
      formDim.classList.remove('on');
      form.classList.remove('active');
      form.classList.remove('active_res');
    });
  }

  // topBtnHandler
  const topBtnHandler = () => {
    const topBtn = document.querySelector('.top_btn');
    const pointSection = document.querySelector('.slide');
    if(scrollY >= pointSection.offsetTop - innerHeight) {
      topBtn.classList.add('active');
    } else {
      topBtn.classList.remove('active');
    }
  };

  // mAnchorHandler
  const mAnchorHandler = () => {
    const formBtn = document.querySelectorAll('.form_btn');
    formBtn.forEach(el => {
      el.dataset.anchor = 'scroll';
    })
  }
  const removeMAnchorHandler = () => {
    const formBtn = document.querySelectorAll('.form_btn');
    formBtn.forEach(el => {
      el.dataset.anchor = '';
    })
  }

  // mAnimation
  const mAnimation = (type) => {
    const attendTitle = document.querySelector('.attend .title');
    const attendItems = document.querySelectorAll('.attend .swiper-slide');
    const sessionTitle = document.querySelector('.session .title');
    const sessionText = document.querySelector('.session .text');
    if(type === "mobile") {
      attendTitle.dataset.aos = "fade-up";
      attendItems.forEach(el => {
        el.dataset.aos = "fade-up";
      });
      sessionTitle.dataset.aos = "fade-up";
      sessionText.dataset.aos = "fade-up";
    } else {

    }
  }

  // mHeader
  const mHeader = () => {
    const header = document.querySelector('header.mobile');
    const headerMenu = document.querySelector('.mobile_gnb');
    const buttons = document.querySelectorAll('.mobile_gnb a');
    const openBtn = document.querySelector('header.mobile .menu');
    const closeBtn = document.querySelector('header.mobile .close');
    
    openBtn.addEventListener('click', (e) => {
      e.preventDefault();
      header.classList.add('on');
      headerMenu.classList.add('on');
    });
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      header.classList.remove('on');
      headerMenu.classList.remove('on');
    });
    buttons.forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        header.classList.remove('on');
        headerMenu.classList.remove('on');
      })
    })
  }
  mHeader();

  // mMainHandler
  const mMainHandler = () => {
    document.querySelector('.main_visual video#mv_video_loop').play();
    const mainTitle = document.querySelector('.main_visual .mv_title');
    const mainLocation = document.querySelector('.main_visual .mv_location');
    const mainDate = document.querySelector('.main_visual .mv_date');
    const mainBtn = document.querySelector('.main_visual .mv_btn.btn_m');
    mainTitle.style.opacity = 1;
    mainTitle.style.filter = 'blur(0)';
    mainTitle.style.transform = 'translate3d(0, 0, 0)';
    mainLocation.style.opacity = 1;
    mainLocation.style.filter = 'blur(0)';
    mainLocation.style.transform = 'translate3d(0, 0, 0)';
    mainDate.style.opacity = 1;
    mainDate.style.filter = 'blur(0)';
    mainDate.style.transform = 'translate3d(0, 0, 0)';
    mainBtn.style.opacity = 1;
    mainBtn.style.filter = 'blur(0)';
    mainBtn.style.transform = 'translate3d(0, 0, 0)';
  }

  // mStoryHandler
  const mStoryHandler = () => {
    const story = document.querySelector('.story');
    const storyTitle = document.querySelector('.story .title');
    const storyTexts = document.querySelectorAll('.story .text');
    const storyVideoWrap = document.querySelector('.story .video_fixed');
    const storyVideo = document.querySelector('.story video');
    const topOffset = document.querySelector('.main_visual').getBoundingClientRect().height;
    story.style.height = `${outerHeight * 4}px`;
    if(scrollY <= topOffset / 2) {
      // 진입 전
      storyVideo.pause();
      storyTitle.style.opacity = 1;
      storyTexts[1].style.opacity = 1;
      storyTexts[3].style.opacity = 0;
      storyTexts[4].style.opacity = 0;
    } else if(scrollY > topOffset / 2 && scrollY < topOffset + outerHeight) {
      // 절반 지난 시점(영상 play)
      storyVideo.play();
      storyTitle.style.opacity = 1;
      storyTexts[1].style.opacity = 1;
      storyTexts[3].style.opacity = 0;
      storyTexts[4].style.opacity = 0;
    } else if(scrollY > topOffset && scrollY < topOffset + outerHeight) {
      // 첫번째 섹션
      storyTitle.style.opacity = 1;
      storyTexts[1].style.opacity = 1;
      storyTexts[3].style.opacity = 0;
      storyTexts[4].style.opacity = 0;
    } else if(scrollY > topOffset + outerHeight && scrollY < topOffset + outerHeight * 2){
      // 두번째 섹션
      storyTexts[1].style.opacity = 0;
      storyTexts[3].style.opacity = 1;
      storyTexts[4].style.opacity = 0;
    } else if(scrollY > topOffset + outerHeight * 2 && scrollY < topOffset + outerHeight * 3){
      // 세번째 섹션
      storyTitle.style.opacity = 1;
      storyVideoWrap.style.opacity = 1;
      storyTexts[1].style.opacity = 0;
      storyTexts[3].style.opacity = 0;
      storyTexts[4].style.opacity = 1;
    } else if(scrollY > topOffset + outerHeight * 3 && scrollY < topOffset + outerHeight * 4){
      storyVideo.play();
      storyTitle.style.opacity = 0;
      storyVideoWrap.style.opacity = 0;
      storyTexts[1].style.opacity = 0;
      storyTexts[3].style.opacity = 0;
      storyTexts[4].style.opacity = 0;
    } else {
      // 진입 후
      storyVideo.pause();
    }
  }
  
  // mSlideHandler
  const mSlideHandler = () => {
    const swiper = new Swiper('.slide .slide_list_wrap', {
      spaceBetween: 14,
    });
  }

  qnaTabHandler();
  qnaListHandler();

  if (matchMedia("screen and (min-width: 767px)").matches) {
    // pc버전에서 실행
    console.log('PC!')
    setLayout();

    mainVideoRatio();
    mainScrollButton();
    mainVideoHandler();
    
    storyInteraction();
    storyVideoRatio();

    attendSwiper();
    attendInteraction();

    hoverSlide();

    eventFixed();

    formModal();

    topBtnHandler();

    window.addEventListener('scroll', () => {
      storyFixed();
      storyInteraction();
  
      slideSS();
  
      attendInteraction();
  
      sessionInteraction();
  
      eventFixed();
      footerFixed();
  
      topBtnHandler();
    });
  } else {
    // mobile버전에서 실행
    console.log('MOBILE!!');

    mAnimation("mobile");
    mAnchorHandler();
    mMainHandler();
    mStoryHandler();
    mSlideHandler();
    window.addEventListener('scroll', () => {
      mStoryHandler();
    });
  }

  let reloadCounter;
  const reloadHandler = () => {
    if (matchMedia("screen and (min-width: 767px)").matches) {
      reloadCounter = 1;
    } else {
      reloadCounter = 0;
    }
  }
  reloadHandler();

  window.addEventListener('resize', () => {
    if (matchMedia("screen and (min-width: 767px)").matches) {
      // pc버전에서 실행
      console.log('PC RESIZE!');
      if (reloadCounter === 0) {
        location.reload();
        reloadCounter++;
      }
      setLayout();

      mainVideoRatio();
      mainScrollButton();
      mainVideoHandler();
      
      storyInteraction();
      storyVideoRatio();

      attendSwiper();
      attendInteraction();

      hoverSlide();

      eventFixed();

      formModal();

      qnaTabHandler();
      qnaListHandler();

      topBtnHandler();

      removeMAnchorHandler();
      window.addEventListener('scroll', () => {
        storyFixed();
        storyInteraction();
    
        slideSS();
        
        attendInteraction();
    
        sessionInteraction();
    
        eventFixed();
        footerFixed();
    
        topBtnHandler();
      });
    } else {
      // mobile버전에서 실행
      console.log('MOBILE RESIZE!');
      if(reloadCounter === 1) {
        location.reload();
        reloadCounter--;
      }
      mAnimation("mobile");

      
    }
  });

  // const cursor = document.querySelector('.custom_cursor');
  // const cursorArea = document.querySelectorAll('.session .table_item.session_item');
  // cursorArea.forEach(() => {
  //   el.addEventListener('mouseenter', (e) => {
  //     setTimeout(() => {cursor.style.position = 'fixed';}, 100);
  //     cursor.style.opacity = 1;
  //     cursorArea.addEventListener('mousemove', (e) => {
  //       cursor.style.left = `${e.clientX}px`;
  //       cursor.style.top = `${e.clientY}px`;
  //     })
  //   });
  //   el.addEventListener('mouseleave', (e) => {
  //     setTimeout(() => {cursor.style.position = 'absolute';}, 100);
  //     cursor.style.opacity = 0;
  //   });
  // })
})();

