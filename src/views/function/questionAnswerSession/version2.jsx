import React, { useState, useEffect, useRef } from 'react';
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

const StepItem = ({ item, index, isActive, onBegin, onAnswer }) => {
  // 动画状态
  const [imageOpacity, setImageOpacity] = useState(0);
  const [question1Opacity, setQuestion1Opacity] = useState(0);
  const [question2Opacity, setQuestion2Opacity] = useState(0);

  // 图片加载完成标志
  const [imageLoaded, setImageLoaded] = useState(false);

  // 动画完成标志
  const imageAnimationDone = useRef(false);
  const question1AnimationDone = useRef(false);

  // 当组件变为激活状态时开始动画
  useEffect(() => {
    if (isActive) {
      // 重置动画状态
      setImageOpacity(0);
      setQuestion1Opacity(0);
      setQuestion2Opacity(0);
      imageAnimationDone.current = false;
      question1AnimationDone.current = false;
    }
  }, [isActive]);

  useEffect(() => {
    let question1Timer = null;
    let question2Timer = null;

    // 如果状态未激活或者图片没有加载完成直接终止
    if (!isActive || !imageLoaded) return;

    const runImageAnimation = () => {
      setImageOpacity(1);
      imageAnimationDone.current = true;
    };

    const runQuestion1Animation = () => {
      question1Timer = setTimeout(() => {
        if (!item.question1) return; // 无question1 → 终止
        setQuestion1Opacity(1);
        question1AnimationDone.current = true;
        runQuestion2Animation(); // 执行完question1，再执行question2
      }, 500);
    };

    const runQuestion2Animation = () => {
      if (!item.question2) return; // 无question2 → 终止
      question2Timer = setTimeout(() => {
        setQuestion2Opacity(1);
      }, 500);
    };

    // 执行图片动画
    runImageAnimation();
    // 执行问题1动画
    runQuestion1Animation();

    return () => {
      clearTimeout(question1Timer);
      clearTimeout(question2Timer);
    };
  }, [isActive, imageLoaded, item.question1, item.question2]);

  return (
    <div
      className={`step-content step${index} ${isActive ? 'fade-enter-done' : 'fade-item'}`}
    >
      <img
        className="image-bg"
        src={item.imgSrc}
        alt=""
        style={{ opacity: imageOpacity }}
        onLoad={() => setImageLoaded(true)}
      />
      {index === 0 && <div onClick={onBegin} className="begin-testing"></div>}
      {!!item.question1 && (
        <img
          onClick={onAnswer}
          className="question question1"
          src={item.question1}
          alt=""
          style={{ opacity: question1Opacity }}
        />
      )}
      {!!item.question2 && (
        <img
          onClick={onAnswer}
          className="question question2"
          src={item.question2}
          alt=""
          style={{ opacity: question2Opacity }}
        />
      )}
    </div>
  );
};

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleBeginTesting = () => {
    setCurrentStep(1);
  };

  const handleAnsweringQuestion = () => {
    setCurrentStep(a => a + 1);
  };

  return (
    <div className="version version2">
      {questionList.map((item, index) => {
        return (
          <StepItem
            key={index}
            item={item}
            index={index}
            isActive={currentStep === index}
            onBegin={handleBeginTesting}
            onAnswer={handleAnsweringQuestion}
          />
        );
      })}
    </div>
  );
};

export default Index;
