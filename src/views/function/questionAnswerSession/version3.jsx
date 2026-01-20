import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import './index.less';

const questionList = [
  {
    imgSrc:
      'https://p5.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/45063552550/76bf/6055/26e8/57a72c6c46587d8a77955e4b6cfadaae.png?imageView=1&type=webp&thumbnail=1004x0',
  },
  {
    imgSrc:
      'https://p5.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/45064521651/2af1/a862/6995/0d276cfa1c041db1069c90b0c1456574.png?imageView=1&type=webp&thumbnail=1008x0',
    question1:
      'https://p5.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/45065513549/6d04/2ddc/37da/cd6ae967cf2e2ed437d0687e34f12f56.png?imageView=1&type=webp&thumbnail=480x0',
    question2:
      'https://p5.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/45047030773/8959/df2e/2722/c2c45b601db7773be2e2ec83703f7a95.png?imageView=1&type=webp&thumbnail=498x0',
  },
  {
    imgSrc:
      'https://p5.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/45064479529/adeb/0084/5bbb/a4c18a0b3e6bc8700447409deaf97d61.png?imageView=1&type=webp&thumbnail=1008x0',
    question1:
      'https://p5.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/45064448605/95d1/7b6f/cff3/beb7469ef6b5f9b1b43c02cb0cc7baed.png?imageView=1&type=webp&thumbnail=470x0',
    question2:
      'https://p5.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/45064468685/2cd2/4dec/aa77/c9ea8efb40efac2a7fb253e8925ca902.png?imageView=1&type=webp&thumbnail=920x0',
  },
  {
    imgSrc:
      'https://p5.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/45064580401/7279/3287/2423/705c543add0dc4e632d473dea78c2324.png?imageView=1&type=webp&thumbnail=1008x0',
    question1:
      'https://p5.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/45064527739/f826/eeba/baf3/14ce114acb980b93c9fdf1930ce3a7ac.png?imageView=1&type=webp&thumbnail=416x0',
    question2:
      'https://p5.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/45064551621/8082/19c6/f2ac/8d70f85e636fe69bf0cea1ef9e9d6b16.png?imageView=1&type=webp&thumbnail=1006x0',
  },
  {
    imgSrc:
      'https://p5.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/45065369623/baf7/bcb0/71fe/f4debb741e7d0778943f16c9ebb1e9d3.png?imageView=1&type=webp&thumbnail=1004x0',
  },
];

const StepItem = React.memo(({ item, index, isActive, onBegin, onAnswer }) => {
  // 合并动画状态为一个对象，减少状态更新次数
  const [animationState, setAnimationState] = useState({
    imageOpacity: 0,
    question1Opacity: 0,
    question2Opacity: 0,
  });
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef(null);

  // 当组件变为激活状态时重置动画状态
  useEffect(() => {
    if (isActive) {
      setAnimationState({
        imageOpacity: 0,
        question1Opacity: 0,
        question2Opacity: 0,
      });
      setImageLoaded(false);
    }
    // 检查图片是否已经加载完成（处理缓存情况）
    if (isActive && imageRef.current) {
      // 如果图片已经加载完成（从缓存中），立即设置加载状态
      if (imageRef.current.complete && imageRef.current.naturalHeight !== 0) {
        setImageLoaded(true);
      }
    }
  }, [isActive]);

  // 处理动画序列
  useEffect(() => {
    if (!isActive || !imageLoaded) return;

    const timers = [];

    // 立即显示图片
    setAnimationState(prev => ({ ...prev, imageOpacity: 1 }));

    // 延迟显示 question1
    if (item.question1) {
      const question1Timer = setTimeout(() => {
        setAnimationState(prev => ({ ...prev, question1Opacity: 1 }));

        // question1 显示后，延迟显示 question2
        if (item.question2) {
          const question2Timer = setTimeout(() => {
            setAnimationState(prev => ({ ...prev, question2Opacity: 1 }));
          }, 500);
          timers.push(question2Timer);
        }
      }, 500);
      timers.push(question1Timer);
    }

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [isActive, imageLoaded, item.question1, item.question2]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const stepClassName = useMemo(
    () =>
      `step-content step${index} ${isActive ? 'fade-enter-done' : 'fade-item'}`,
    [index, isActive]
  );

  return (
    <div className={stepClassName}>
      <img
        ref={imageRef}
        className="image-bg"
        src={item.imgSrc}
        alt=""
        style={{ opacity: animationState.imageOpacity }}
        onLoad={handleImageLoad}
      />
      {index === 0 && <div onClick={onBegin} className="begin-testing" />}
      {item.question1 && (
        <img
          onClick={onAnswer}
          className="question question1"
          src={item.question1}
          alt=""
          style={{ opacity: animationState.question1Opacity }}
        />
      )}
      {item.question2 && (
        <img
          onClick={onAnswer}
          className="question question2"
          src={item.question2}
          alt=""
          style={{ opacity: animationState.question2Opacity }}
        />
      )}
    </div>
  );
});

StepItem.displayName = 'StepItem';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const handleBeginTesting = useCallback(() => {
    setCurrentStep(1);
  }, []);

  const handleAnsweringQuestion = useCallback(() => {
    setCurrentStep(prev => prev + 1);
  }, []);

  const renderedItems = useMemo(() => {
    return questionList
      .map((item, index) => ({ item, index }))
      .filter(({ index }) => index <= currentStep + 1);
  }, [currentStep]);

  return (
    <div className="version version3">
      {renderedItems.map(({ item, index }) => (
        <StepItem
          key={index}
          item={item}
          index={index}
          isActive={currentStep === index}
          onBegin={handleBeginTesting}
          onAnswer={handleAnsweringQuestion}
        />
      ))}
    </div>
  );
};

export default Index;
