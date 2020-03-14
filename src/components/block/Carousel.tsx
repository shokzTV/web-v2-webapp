import { ReactNode, ReactElement, useState, useEffect } from "react";
import Slider from "react-slick";

function NextArrow(props): ReactElement {
    const {onClick} = props;
    return (
        <div className={'icon slick-arrow slick-next' } onClick={onClick}>
            <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path></svg>
            <style jsx>{`.icon {font-size: 20px;}`}</style>
        </div>
    );
}

function PrevArrow(props): ReactElement {
    const {onClick} = props;
    return (
        <div className={'icon slick-arrow slick-prev'} onClick={onClick}>
            <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="left" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path></svg>
            <style jsx>{`.icon {font-size: 20px;}`}</style>
        </div>
    );
}

const sliderSettings = {
    autoplay: false,
    draggable: true,
    pauseOnHover: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ],
    dots: false,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
};

export default function Carousel({children, slidesToShow = 3}: {children: ReactNode; slidesToShow?: number;}): ReactElement {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(document.documentElement.clientWidth);
    const resize = () => {
      setWidth(document.documentElement.clientWidth);
    }

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <>
    <Slider {...sliderSettings}>
      {children}
      {slidesToShow < 2 && width > 480 && <div />}
      {slidesToShow < 3 && width > 768 && <div />}
    </Slider>

    <style jsx global>{`
      .slick-slider{padding: 0 20px;position:relative;display:block;box-sizing:border-box;touch-action:pan-y;}
      .slick-list{position:relative;display:block;margin:0;padding:0;overflow:hidden;}
      .slick-list:focus{outline:none;}
      .slick-list .slick-slide{pointer-events:none;}
      .slick-list .slick-slide.slick-active{pointer-events:auto;}
      .slick-slider .slick-list,.slick-slider .slick-track{transform:translateZ(0);}
      .slick-track{position:relative;top:0;left:0;display:block;}
      .slick-track:after,.slick-track:before{display:table;content:"";}
      .slick-track:after{clear:both;}
      .slick-slide{display:none;float:left;height:100%;min-height:1px;}
      .slick-slide img{display:block;}
      .slick-initialized .slick-slide{display:block;}
      .slick-next,.slick-prev{position:absolute;top:50%;display:block;width:20px;height:20px;margin-top:-10px;padding:0;font-size:0;line-height:0;border:0;cursor:pointer;}
      .slick-next,.slick-next:focus,.slick-next:hover,.slick-prev,.slick-prev:focus,.slick-prev:hover{color:transparent;background:transparent;outline:none;}
      .slick-next:focus:before,.slick-next:hover:before,.slick-prev:focus:before,.slick-prev:hover:before{opacity:1;}
      .slick-prev{left:-1px;}
      .slick-next{right:-1px;}  
      .slick-arrow{font-size:20px;}
    `}</style>
  </>;
}