import React, { useEffect, useState, useRef } from 'react'
import { Button, message, Spin, Image } from 'antd';
import Styles from './index.module.scss'
// 引入Swiper核心
import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar, Mousewheel, Autoplay, Pagination } from 'swiper/modules'
import { Link, useLocation } from 'react-router-dom'
import CountUp from 'react-countup'
import 'swiper/css'
import 'swiper/css/scrollbar'
import { ReactComponent as Home1 } from '../../assets/home1.svg'
import { ReactComponent as Home2 } from '../../assets/home2.svg'
import { ReactComponent as ServiceWrap1 } from '../../assets/serviceWrap1.svg'
import { ReactComponent as ServiceWrap2 } from '../../assets/serviceWrap2.svg'
import { ReactComponent as ServiceWrap3 } from '../../assets/serviceWrap3.svg'
import { ReactComponent as Count1 } from '../../assets/count1.svg'
import { ReactComponent as Count2 } from '../../assets/count2.svg'
import { ReactComponent as Count3 } from '../../assets/count3.svg'
import { ReactComponent as Count4 } from '../../assets/count4.svg'
import { ReactComponent as Vision1 } from '../../assets/vision1.svg'
import { ReactComponent as Vision2 } from '../../assets/vision2.svg'

import { ReactComponent as Business1 } from '../../assets/business1.svg'
import { ReactComponent as Business2 } from '../../assets/business2.svg'
import { ReactComponent as Business3 } from '../../assets/business3.svg'
import { ReactComponent as Business4 } from '../../assets/business4.svg'
// 轮播图图片
import Our1 from '../../assets/our1.png'
import Our2 from '../../assets/our2.png'
import Our3 from '../../assets/our3.webp'
import Our4 from '../../assets/our4.webp'
import Our5 from '../../assets/our5.png'
import Our6 from '../../assets/our6.png'
import Our7 from '../../assets/our7.png'
import Our8 from '../../assets/our8.png'
import Our9 from '../../assets/our9.png'
import Our10 from '../../assets/our10.png'
import Our11 from '../../assets/our11.png'
import Our12 from '../../assets/our12.png'
import Our13 from '../../assets/our13.png'
import Our14 from '../../assets/our14.png'
import Our15 from '../../assets/our15.jpg'
import Our16 from '../../assets/our16.png'

import Stra1 from '../../assets/stra1.png'
import Stra2 from '../../assets/stra2.png'
import Stra3 from '../../assets/stra3.png'
import Stra4 from '../../assets/stra4.png'
import Stra5 from '../../assets/stra5.png'
import Stra6 from '../../assets/stra6.jpeg'
import Stra7 from '../../assets/stra7.png'
import Stra8 from '../../assets/stra8.png'
import Stra9 from '../../assets/stra9.png'
import Stra10 from '../../assets/stra10.png'
import Stra11 from '../../assets/stra11.png'
import Stra12 from '../../assets/stra12.jpg'

// 客户logo数据
const brandList = [
    { name: 'Johnson&Johnson', type: 'svg', src: Our1 },
    { name: 'GSK', type: 'img', src: Our2 },
    { name: 'MSD', type: 'img', src: Our3 },
    { name: 'BeOne', type: 'img', src: Our4 },
    { name: 'Boehringer Ingelheim', type: 'img', src: Our5 },
    { name: 'novo nordisk', type: 'img', src: Our6 },
    { name: 'NOVARTIS', type: 'img', src: Our7 },
    { name: 'zaiLab', type: 'img', src: Our8 },
];
const brandListTo = [
    { name: 'Johnson&Johnson2', type: 'img', src: Our9 },
    { name: 'GSK2', type: 'img', src: Our10 },
    { name: 'MSD2', type: 'img', src: Our11 },
    { name: 'BeOn2', type: 'img', src: Our12 },
    { name: 'Boehringer Ingelheim2', type: 'img', src: Our13 },
    { name: 'novo nordisk2', type: 'img', src: Our14 },
    { name: 'NOVARTIS2', type: 'img', src: Our15 },
    { name: 'zaiLab2', type: 'img', src: Our16 },
];
const brandListThree = [
    { name: 'Johnson&Johnson', type: 'svg', src: Our1 },
    { name: 'GSK', type: 'img', src: Our2 },
    { name: 'MSD', type: 'img', src: Our3 },
    { name: 'BeOne', type: 'img', src: Our4 },
    { name: 'Boehringer Ingelheim', type: 'img', src: Our5 },
    { name: 'novo nordisk', type: 'img', src: Our6 },

];
const brandListFour = [
    { name: 'NOVARTIS', type: 'img', src: Our7 },
    { name: 'zaiLab', type: 'img', src: Our8 },
    { name: 'Johnson&Johnson2', type: 'img', src: Our9 },
    { name: 'GSK2', type: 'img', src: Our10 },
    { name: 'MSD2', type: 'img', src: Our11 },
    { name: 'BeOn2', type: 'img', src: Our12 },

];
const brandFive = [
    { name: 'Boehringer Ingelheim2', type: 'img', src: Our13 },
    { name: 'novo nordisk2', type: 'img', src: Our14 },
    { name: 'NOVARTIS2', type: 'img', src: Our15 },
    { name: 'zaiLab2', type: 'img', src: Our16 },
];


const strategicList = [
    { name: 'Johnson&Johnson', type: 'svg', src: Stra1 },
    { name: 'GSK', type: 'img', src: Stra2 },
    { name: 'MSD', type: 'img', src: Stra3 },
    { name: 'BeOne', type: 'img', src: Stra4 },
    { name: 'Boehringer Ingelheim', type: 'img', src: Stra5 },
    { name: 'novo nordisk', type: 'img', src: Stra6 },
    { name: 'NOVARTIS', type: 'img', src: Stra7 },
    { name: 'zaiLab', type: 'img', src: Stra8 },
];
const strategicListTo = [
    { name: 'Johnson&Johnson', type: 'svg', src: Stra9 },
    { name: 'GSK', type: 'img', src: Stra10 },
    { name: 'MSD', type: 'img', src: Stra11 },
    { name: 'BeOne', type: 'img', src: Stra12 },

];

const strategicListThree = [
    { name: 'Johnson&Johnson', type: 'svg', src: Stra1 },
    { name: 'GSK', type: 'img', src: Stra2 },
    { name: 'MSD', type: 'img', src: Stra3 },
    { name: 'BeOne', type: 'img', src: Stra4 },
    { name: 'Boehringer Ingelheim', type: 'img', src: Stra5 },
    { name: 'novo nordisk', type: 'img', src: Stra6 },

];
const strategicListFour = [
    { name: 'NOVARTIS', type: 'img', src: Stra7 },
    { name: 'zaiLab', type: 'img', src: Stra8 },
    { name: 'Johnson&Johnson', type: 'svg', src: Stra9 },
    { name: 'GSK', type: 'img', src: Stra10 },
    { name: 'MSD', type: 'img', src: Stra11 },
    { name: 'BeOne', type: 'img', src: Stra12 },
];



const Home = () => {
    // 当前激活下标，默认2024
    const [activeIndex, setActiveIndex] = useState(0)
    const [isShowAnim, setIsShowAnim] = useState(false)
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    let swiperInstance = null;
    const swiperRef = useRef(null)
    const wrapRef = useRef(null)
    const location = useLocation()

    // 控制侧边菜单显示隐藏
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // 判断是否移动端：宽度≤768
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isMobileTo, setIsMobileTo] = useState(window.innerWidth <= 414);

    // 监听窗口尺寸变化
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            const mobileTo = window.innerWidth <= 414;
            setIsMobileTo(mobileTo);
            // 切大屏时自动关闭侧边菜单
            if (!mobile) setIsMenuOpen(false);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    // 监听模块进入可视区域，只触发一次动画
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsShowAnim(true)
                    observer.unobserve(wrapRef.current)
                }
            },
            { threshold: 0.2 }
        )

        if (wrapRef.current) {
            observer.observe(wrapRef.current)
        }

        return () => {
            if (wrapRef.current) observer.unobserve(wrapRef.current)
        }
    }, [])

    const herderList = [
        { title: 'Home', path: '/home' },
        { title: 'Business Segments', path: '/business-segments' },
        { title: 'Contact', path: '/contact' }
    ]

    // 打开侧边菜单
    const openMenu = () => setIsMenuOpen(true);
    // 关闭侧边菜单
    const closeMenu = () => setIsMenuOpen(false);

    // 滑动切换时更新激活下标
    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.activeIndex)
    }

    // 点击底部年份跳转到对应轮播，先判断实例是否存在再调用方法
    const clickYearTab = (index) => {
        if (swiperRef.current) {
            swiperRef.current.slideTo(index)
            setActiveIndex(index)
        }
    }
    // 获取swiper实例
    const getSwiperInstance = (swiper) => {
        swiperInstance = swiper;
    };

    // 切换页码回调
    const onSlideChangeHandler = (swiper) => {
        const realIndex = isMobileTo ? swiper.realIndex % 3 : swiper.realIndex % 2;
        setCurrentPageIndex(realIndex);
    };

    // 点击分页跳转
    const handlePageClick = (index) => {
        swiperInstance?.slideTo(index);
    };
    console.log('isMobile', isMobile)
    return (
        <div className={Styles.wrap}>
            <div className={Styles.header}>
                <div className={Styles.headerLeft}>
                    <Home1 />
                    <span className={Styles.headerLeft_icon}></span>
                    <Home2 />
                </div>
                {!isMobile && (
                    <div className={Styles.headerRight}>
                        {
                            herderList.map((item, index) => {
                                return (
                                    <Link
                                        key={index}
                                        to={item.path}
                                        className={
                                            location.pathname === item.path
                                                ? `${Styles.headerRight_item} ${Styles.headerActive}`
                                                : Styles.headerRight_item
                                        }
                                    >
                                        {item.title}
                                    </Link>
                                )
                            })
                        }
                    </div>
                )}
                {isMobile && (
                    <button className={Styles.hamburgerBtn} onClick={openMenu}>
                        ≡
                    </button>
                )}
                {/* 右侧侧边抽屉菜单 */}
                {isMenuOpen && (
                    <div className={Styles.menuOverlay} onClick={closeMenu}>
                        <div
                            className={Styles.drawerWrap}
                            onClick={(e) => e.stopPropagation()} // 阻止点击菜单内部关闭
                        >
                            {/* 抽屉头部：Logo + 关闭按钮 */}
                            <div className={Styles.drawerHeader}>
                                <div className={Styles.logoWrap}>
                                    <Home1 />
                                    <span className={Styles.headerLeft_icon}></span>
                                    <Home2 />
                                </div>
                                <button className={Styles.closeBtn} onClick={closeMenu}>×</button>
                            </div>
                            {/* 侧边导航菜单 */}
                            <nav className={Styles.mobileNav}>
                                <a href="/home" onClick={closeMenu}>Home</a>
                                <a href="/business-segments" onClick={closeMenu}>Business Segments</a>
                                <a href="/contact" onClick={closeMenu}>Contact</a>
                            </nav>
                        </div>
                    </div>
                )}
            </div>
            <div className={Styles.bannerBg}>
                <div className={Styles.bannerContent}>
                    <div className={Styles.tagTip}>Healthcare Intelligence Platform</div>
                    <div className={Styles.mainTitle}>
                        Global Healthcare<br />
                        Talent &<br />
                        Intelligence<br />
                        Platform
                    </div>
                    {
                        !isMobileTo && (
                            <>
                                <div className={Styles.descText}>
                                    Connecting Life Sciences Companies, Investors,<br />
                                    And Decision-Makers With Top Talent And<br />
                                    Expert Insights Worldwide.
                                </div>
                                <div className={Styles.btnGroup}>
                                    <button className={Styles.btnPrimary}>Talk To Us</button>
                                    <button className={Styles.btnOutline}>Explore Services</button>
                                </div>
                            </>
                        )
                    }

                </div>
            </div>
            {/* 三大服务模块 */}
            <div className={Styles.serviceWrap}>
                {/* 第一项 */}
                <div className={Styles.serviceItem}>
                    <div className={Styles.iconBox}>
                        <ServiceWrap1 />
                    </div>
                    {
                        !isMobile ? (
                            <div className={Styles.textBox}>
                                AI-Driven Talent<br />Matching
                            </div>
                        ) : (
                            <div className={Styles.textBox}>
                                AI-Driven Talent Matching
                            </div>
                        )
                    }

                </div>

                {/* 第二项 */}
                <div className={Styles.serviceItem}>
                    <div className={Styles.iconBox}>
                        <ServiceWrap2 />
                    </div>
                    <div className={Styles.textBox}>
                        Global Healthcare<br />Network
                    </div>
                </div>

                {/* 第三项 */}
                <div className={Styles.serviceItem}>
                    <div className={Styles.iconBox}>
                        <ServiceWrap3 />
                    </div>
                    <div className={Styles.textBox}>
                        Executive & Expert<br />Access
                    </div>
                </div>
            </div>
            {/* About Us 模块 */}
            <div className={Styles.section}>
                <div className={Styles.sectionLeft}>
                    {
                        !isMobile ? (
                            <h2 className={Styles.sectionTitle}>
                                About Us<br />
                                <span className={Styles.blueText}>Who We Are</span>
                            </h2>
                        ) : (
                            <div className={Styles.sectionTitle}>
                                About Us
                                <div className={Styles.blueText}>Who We Are</div>
                            </div>
                        )
                    }

                </div>
                <div className={Styles.sectionRight}>
                    <div className={Styles.aboutText}>
                        <p>
                            Founded in 2009, IntelliPro Group is a top talent management firm and HR solutions provider. We leverage AI and Big Data for top-notch services. With a global footprint, we source diverse talent and support clients worldwide, addressing global workforce needs. Our focus is on spurring innovation in diverse industries including high-tech and life sciences. Serving premier companies, we help achieve global development goals. Our vision is a global expressway for seamless connectivity and growth.
                        </p>
                        <p>
                            Based on IntelliPro Group's global platform, IntelliPro Bio specializes in talent solutions and strategic intelligence for the healthcare and life sciences industry.
                        </p>
                        <p>
                            We leverage AI, big data, and a global network to connect companies with top-tier professionals and industry experts, supporting innovation and growth across the full healthcare lifecycle.
                        </p>
                    </div>
                </div>
            </div>
            {/* 15 Years Of Global Growth + Swiper横向轮播 */}
            <div className={Styles.growthWrap}>
                <div className={Styles.growthHead}>
                    <div className={Styles.headLeft}>
                        <h2 className={Styles.mainTitle}>
                            15 Years Of<br />
                            <span className={Styles.blueText}>Global Growth</span>
                        </h2>
                    </div>
                    <div className={Styles.headRight}>
                        <p className={Styles.descTip}>
                            From a Silicon Valley startup to a global HR leader – every milestone marks our commitment to talent across borders.
                        </p>
                    </div>
                </div>

                <div className={Styles.yearSwiperBox}>
                    <Swiper
                        modules={[Scrollbar, Mousewheel]}
                        slidesPerView="auto"
                        spaceBetween={0}
                        scrollbar={{ draggable: true, hide: false }}
                        mousewheel={{
                            forceToAxis: false,
                            invert: true,
                            releaseOnEdges: false,
                            sensitivity: 1
                        }}

                        onSlideChange={handleSlideChange}
                        onSwiper={(swiper) => swiperRef.current = swiper}
                        className={Styles.yearSwiper}
                    >
                        <SwiperSlide className={Styles.yearCardActive}>
                            <div className={Styles.yearTop}>
                                <span className={Styles.yearNum}>2024</span>
                                <span className={Styles.latestTag}>LATEST</span>
                            </div>
                            <div className={Styles.yearLine}></div>
                            <ul className={Styles.yearList}>
                                <li>Top 10 Talent Service Agencies In China's Global Orientation</li>
                                <li>First Resources [2024 China Enterprise Sailing Award]</li>
                                <li>Geely Auto Global Best Human Resource Partner</li>
                            </ul>
                        </SwiperSlide>

                        <SwiperSlide className={Styles.yearCardNormal}>
                            <div className={Styles.yearTop}>
                                <span className={Styles.yearNum}>2023</span>
                            </div>
                            <div className={Styles.yearLine}></div>
                            <ul className={Styles.yearList}>
                                <li>Asia Business And Professional Growth Vanguard Award</li>
                                <li>Top 100 Fastest-Growing Asian Businesses Recognized By The U.S. Department Of Commerce</li>
                            </ul>
                        </SwiperSlide>

                        <SwiperSlide className={Styles.yearCardNormal}>
                            <div className={Styles.yearTop}>
                                <span className={Styles.yearNum}>2022</span>
                            </div>
                            <div className={Styles.yearLine}></div>
                            <ul className={Styles.yearList}>
                                <li>Awarded The "Great Place To Work" Certification In North America For Three Consecutive Years</li>
                                <li>Top 1 Global Human Resources Partner Of Tencent In 2022</li>
                            </ul>
                        </SwiperSlide>

                        <SwiperSlide className={Styles.yearCardNormal}>
                            <div className={Styles.yearTop}>
                                <span className={Styles.yearNum}>2021</span>
                            </div>
                            <div className={Styles.yearLine}></div>
                            <ul className={Styles.yearList}>
                                <li>Establishment Of The First Offices In India, Singapore, Philippines</li>
                                <li>Award National Certification As A "Minority Business Enterprise" By NMSDC</li>
                                <li>TOP 1 HR Partner For TikTok In North America</li>
                            </ul>
                        </SwiperSlide>

                        <SwiperSlide className={Styles.yearCardNormal}>
                            <div className={Styles.yearTop}>
                                <span className={Styles.yearNum}>2018</span>
                            </div>
                            <div className={Styles.yearLine}></div>
                            <ul className={Styles.yearList}>
                                <li>Top 1 Service | Google MSP</li>
                                <li>Top 1 Human Provider Of Hr America Recruit</li>
                            </ul>
                        </SwiperSlide>

                        <SwiperSlide className={Styles.yearCardNormal}>
                            <div className={Styles.yearTop}>
                                <span className={Styles.yearNum}>2017</span>
                            </div>
                            <div className={Styles.yearLine}></div>
                            <ul className={Styles.yearList}>
                                <li>Top 1 Service | Google MSP</li>
                                <li>Top 1 Human Provider Of Hr America Recruit</li>
                            </ul>
                        </SwiperSlide>

                        <SwiperSlide className={Styles.yearCardNormal}>
                            <div className={Styles.yearTop}>
                                <span className={Styles.yearNum}>2009</span>
                            </div>
                            <div className={Styles.yearLine}></div>
                            <ul className={Styles.yearList}>
                                <li>Top 1 Service | Google MSP</li>
                                <li>Top 1 Human Provider Of Hr America Recruit</li>
                            </ul>
                        </SwiperSlide>
                    </Swiper>

                    <div className={Styles.yearTabWrap}>
                        <div
                            className={activeIndex === 0 ? Styles.yearTabActive : Styles.yearTabItem}
                            onClick={() => clickYearTab(0)}
                        >
                            2024
                        </div>
                        <div
                            className={activeIndex === 1 ? Styles.yearTabActive : Styles.yearTabItem}
                            onClick={() => clickYearTab(1)}
                        >
                            2023
                        </div>
                        <div
                            className={activeIndex === 2 ? Styles.yearTabActive : Styles.yearTabItem}
                            onClick={() => clickYearTab(2)}
                        >
                            2022
                        </div>
                        <div
                            className={activeIndex === 3 ? Styles.yearTabActive : Styles.yearTabItem}
                            onClick={() => clickYearTab(3)}
                        >
                            2021
                        </div>
                        <div
                            className={activeIndex === 4 ? Styles.yearTabActive : Styles.yearTabItem}
                            onClick={() => clickYearTab(4)}
                        >
                            2018
                        </div>
                        <div
                            className={activeIndex === 5 ? Styles.yearTabActive : Styles.yearTabItem}
                            onClick={() => clickYearTab(5)}
                        >
                            2017
                        </div>
                        <div
                            className={activeIndex === 6 ? Styles.yearTabActive : Styles.yearTabItem}
                            onClick={() => clickYearTab(6)}
                        >
                            2009
                        </div>
                    </div>

                    <div className={Styles.scrollTip}>
                        <span>&gt;</span>
                        <span>&gt;</span>
                        <span>&gt;</span>
                        <span>Scroll to explore all milestones</span>
                    </div>
                </div>
            </div>

            {/* 数字统计区 */}
            {
                !isMobile ? (
                    <div ref={wrapRef} className={Styles.dataWrap}>
                        {/* 第1个卡片 */}
                        <div className={Styles.dataItem}>
                            <div className={Styles.iconBox}>
                                <Count1 />
                            </div>
                            <div className={Styles.numText}>
                                {isShowAnim ? <CountUp start={0} end={30} duration={2.5} /> : '0'}+
                            </div>
                            <div className={Styles.descText}>
                                Countries &<br />
                                Regions Coverage
                            </div>
                        </div>

                        {/* 第2个卡片 */}
                        <div className={Styles.dataItem}>
                            <div className={Styles.iconBox}>
                                <Count2 />
                            </div>
                            <div className={Styles.numText}>
                                {isShowAnim ? <CountUp start={0} end={1000} duration={2.5} separator="," /> : '0'}+
                            </div>
                            <div className={Styles.descText}>Employees</div>
                        </div>

                        {/* 第3个卡片 */}
                        <div className={Styles.dataItem}>
                            <div className={Styles.iconBox}>
                                <Count3 />
                            </div>
                            <div className={Styles.numText}>
                                {isShowAnim ? <CountUp start={0} end={500} duration={2.5} /> : '0'}+
                            </div>
                            <div className={Styles.descText}>
                                World-Class<br />
                                Clients
                            </div>
                        </div>

                        {/* 第4个卡片 */}
                        <div className={Styles.dataItem}>
                            <div className={Styles.iconBox}>
                                <Count4 />
                            </div>
                            <div className={Styles.numText}>
                                {isShowAnim ? <CountUp start={0} end={15} duration={2.5} /> : '0'}+
                            </div>
                            <div className={Styles.descText}>Years Experience</div>
                        </div>
                    </div>
                ) : (
                    <div ref={wrapRef} className={Styles.dataWrap}>
                        {/* 第1个卡片 */}
                        <div className={Styles.dataItem}>
                            <div className={Styles.iconBox}>
                                <Count1 />
                            </div>
                            <div>
                                <div className={Styles.numText}>
                                    {isShowAnim ? <CountUp start={0} end={30} duration={2.5} /> : '0'}+
                                </div>
                                <div className={Styles.descText}>
                                    Countries &<br />
                                    Regions Coverage
                                </div>
                            </div>

                        </div>

                        {/* 第2个卡片 */}
                        <div className={Styles.dataItem}>
                            <div className={Styles.iconBox}>
                                <Count2 />
                            </div>
                            <div>
                                <div className={Styles.numText}>
                                    {isShowAnim ? <CountUp start={0} end={1000} duration={2.5} separator="," /> : '0'}+
                                </div>
                                <div className={Styles.descText}>Employees</div>
                            </div>
                        </div>

                        {/* 第3个卡片 */}
                        <div className={Styles.dataItem}>
                            <div className={Styles.iconBox}>
                                <Count3 />
                            </div>
                            <div>
                                <div className={Styles.numText}>
                                    {isShowAnim ? <CountUp start={0} end={500} duration={2.5} /> : '0'}+
                                </div>
                                <div className={Styles.descText}>
                                    World-Class<br />
                                    Clients
                                </div>
                            </div>
                        </div>

                        {/* 第4个卡片 */}
                        <div className={Styles.dataItem}>
                            <div className={Styles.iconBox}>
                                <Count4 />
                            </div>
                            <div>
                                <div className={Styles.numText}>
                                    {isShowAnim ? <CountUp start={0} end={15} duration={2.5} /> : '0'}+
                                </div>
                                <div className={Styles.descText}>Years Experience</div>
                            </div>
                        </div>
                    </div>
                )
            }


            {/* Vision & Mission */}
            <div className={Styles.vmWrap}>
                <h2 className={Styles.mainTitle}>
                    <div>Vision &</div> <span className={Styles.blueText}>Mission</span>
                </h2>

                {/* Vision卡片 */}
                {
                    isMobileTo ? (
                        <div className={Styles.vmCard}>
                            <div className={Styles.cardHeader}>
                                <div className={Styles.iconBox}>
                                    <Vision1 />
                                </div>
                                <div className={Styles.cardTitle}>Vision</div>
                            </div>
                            <div className={Styles.cardDesc}>
                                To build a global expressway for seamless talent connectivity and mutual growth.
                            </div>
                        </div>
                    ) : (
                        isMobile ? (
                            <div className={Styles.vmCard}>
                                <div className={Styles.cardHeader}>
                                    <div className={Styles.iconBox}>
                                        <Vision1 />
                                    </div>
                                </div>
                                <div className={Styles.vmCard_text}>
                                    <div className={Styles.cardTitle}>Vision</div>
                                    <div className={Styles.cardDesc}>
                                        To build a global expressway for seamless talent connectivity and mutual growth.
                                    </div>
                                </div>

                            </div>
                        ) : (
                            <div className={Styles.vmCard}>
                                <div className={Styles.cardHeader}>
                                    <div className={Styles.iconBox}>
                                        <Vision1 />
                                    </div>
                                    <h3 className={Styles.cardTitle}>Vision</h3>
                                </div>
                                <p className={Styles.cardDesc}>
                                    To build a global expressway for seamless talent connectivity and mutual growth.
                                </p>
                            </div>
                        )
                    )
                }


                {/* Mission卡片 */}
                {
                    isMobileTo ? (
                        <div className={Styles.vmCard}>
                            <div className={Styles.cardHeader}>
                                <div className={Styles.iconBox}>
                                    <Vision2 />
                                </div>
                                <div className={Styles.cardTitle}>Mission</div>
                            </div>
                            <div className={Styles.cardDesc}>
                                We are committed to fostering a workplace that embraces diversity, equity, and inclusion. We believe that diverse perspectives drive innovation and lead to better business outcomes. Our mission is to create an environment where every individual feels valued, respected, and empowered to contribute their unique talents to collective success. We strive to create equal opportunities for professional growth and development for all, irrespective of gender, race, ethnicity, age, sexual orientation, disability, or any other demographic characteristic.
                            </div>

                        </div>
                    ) : (
                        isMobile ? (
                            <div className={Styles.vmCard}>
                                <div className={Styles.cardHeader}>
                                    <div className={Styles.iconBox}>
                                        <Vision2 />
                                    </div>
                                </div>
                                <div className={Styles.vmCard_text}>
                                    <div className={Styles.cardTitle}>Mission</div>
                                    <div className={Styles.cardDesc}>
                                        We are committed to fostering a workplace that embraces diversity, equity, and inclusion. We believe that diverse perspectives drive innovation and lead to better business outcomes. Our mission is to create an environment where every individual feels valued, respected, and empowered to contribute their unique talents to collective success. We strive to create equal opportunities for professional growth and development for all, irrespective of gender, race, ethnicity, age, sexual orientation, disability, or any other demographic characteristic.
                                    </div>
                                </div>

                            </div>
                        ) : (
                            <div className={Styles.vmCard}>
                                <div className={Styles.cardHeader}>
                                    <div className={Styles.iconBox}>
                                        <Vision2 />
                                    </div>
                                    <h3 className={Styles.cardTitle}>Mission</h3>
                                </div>
                                <p className={Styles.cardDesc}>
                                    We are committed to fostering a workplace that embraces diversity, equity, and inclusion. We believe that diverse perspectives drive innovation and lead to better business outcomes. Our mission is to create an environment where every individual feels valued, respected, and empowered to contribute their unique talents to collective success. We strive to create equal opportunities for professional growth and development for all, irrespective of gender, race, ethnicity, age, sexual orientation, disability, or any other demographic characteristic.
                                </p>
                            </div>
                        )
                    )
                }


            </div>

            {/* Business Segments */}
            <div className={Styles.businessWrap}>
                {/* 头部标题区域 */}
                <div className={Styles.businessHead}>
                    <h2 className={Styles.mainTitle}>Business Segments</h2>
                    <div className={Styles.viewAllBtn}>View All Segments →</div>
                </div>
                <div className={Styles.subDesc}>
                    Explore our specialized service areas designed for every stage of the healthcare talent lifecycle.
                </div>

                {/* 四个业务卡片容器 */}
                <div className={Styles.cardContainer}>
                    {/* 卡片1 Executive Search */}
                    <div className={Styles.businessCard}>
                        <div className={Styles.businessCard_item}>
                            <div className={Styles.iconBox}>
                                <Business1 />
                            </div>
                            <div className={Styles.cardTag}>Leadership</div>
                        </div>

                        <h3 className={Styles.cardTitle}>Executive Search</h3>
                        <div className={Styles.cardText}>
                            Specializing in building diverse senior leadership teams, we employ a data-driven approach for efficient and precise searches.
                        </div>
                        <div className={Styles.exploreLink}>Explore &gt;</div>
                    </div>

                    {/* 卡片2 Flexible Staffing */}
                    <div className={Styles.businessCard}>
                        <div className={Styles.businessCard_item}>

                            <div className={Styles.iconBox}>
                                <Business2 />
                            </div>
                            <div className={Styles.cardTag}>Core Service</div>
                        </div>

                        <h3 className={Styles.cardTitle}>Flexible Staffing</h3>
                        <div className={Styles.cardText}>
                            IntelliPro provides tailored workforce management solutions, offering partners access to a vast candidate pool and a mix of high-tech and human-focused strategies.
                        </div>
                        <div className={Styles.exploreLink}>Explore &gt;</div>
                    </div>

                    {/* 卡片3 Global HR Solutions */}
                    <div className={Styles.businessCard}>
                        <div className={Styles.businessCard_item}>

                            <div className={Styles.iconBox}>
                                <Business3 />
                            </div>
                            <div className={Styles.cardTag}>Technology</div>
                        </div>

                        <h3 className={Styles.cardTitle}>Global HR Solutions</h3>
                        <div className={Styles.cardText}>
                            Three Global Workforce Management solutions: EOR, PEO and HRO, helping you simplify global team management while ensure legal compliance.
                        </div>
                        <div className={Styles.exploreLink}>Explore &gt;</div>
                    </div>

                    {/* 卡片4 BPO */}
                    <div className={Styles.businessCard}>
                        <div className={Styles.businessCard_item}>

                            <div className={Styles.iconBox}>
                                <Business4 />
                            </div>
                            <div className={Styles.cardTag}>Enterprise</div>
                        </div>

                        <h3 className={Styles.cardTitle}>Business Process Outsourcing (BPO)</h3>
                        <div className={Styles.cardText}>
                            Enhance your business with our BPO solutions: Trust & Safety, Data Management, Technical Support, User Support, App Development, and more.
                        </div>
                        <div className={Styles.exploreLink}>Explore &gt;</div>
                    </div>
                </div>
            </div>

            {/* Our Clients */}
            <div className={Styles.clientLogoContainer}>
                <div className={Styles.titleBox}>
                    <h2 className={Styles.mainTitle}>Our Clients</h2>
                    <span className={Styles.blueLine}></span>
                </div>
                <div className={Styles.clientDescTxt}>
                    Trusted by Fortune 500 corporations, innovative startups, and growing companies worldwide.
                </div>

                <div className={Styles.logoSwiperWrap}>
                    <Swiper
                        modules={[Mousewheel, Autoplay]}
                        slidesPerView={1} // 一页只展示1个slide（内部包含2行4列8个logo）
                        spaceBetween={24}
                        scrollbar={{ draggable: true, hide: false }}
                        mousewheel={{
                            horizontal: true,
                            forceToAxis: true
                        }}
                        autoplay={{
                            delay: 2000,        // 2秒自动切换一页
                            disableOnInteraction: false, // 用户拖拽/点击后继续自动轮播
                            // pauseOnMouseEnter: true,     // 鼠标悬浮在轮播区域时暂停轮播
                        }}
                        loop={true} // 开启无限循环轮播
                        onSwiper={getSwiperInstance}
                        onSlideChange={onSlideChangeHandler}
                        className={Styles.brandSwiper}
                    >
                        {
                            isMobileTo ? (
                                <>
                                    <SwiperSlide className={Styles.brandSlideWrap}>
                                        <div className={Styles.brandGridBox}>
                                            {brandListThree.map((item, idx) => (
                                                <div key={idx} className={Styles.brandLogoBox}>
                                                    <img src={item.src} className={Styles.logoImg} />
                                                </div>
                                            ))}
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className={Styles.brandSlideWrap}>
                                        <div className={Styles.brandGridBox}>
                                            {brandListFour.map((item, idx) => (
                                                <div key={idx} className={Styles.brandLogoBox}>
                                                    <img src={item.src} className={Styles.logoImg} />
                                                </div>
                                            ))}
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className={Styles.brandSlideWrap}>
                                        <div className={Styles.brandGridBox}>
                                            {brandFive.map((item, idx) => (
                                                <div key={idx} className={Styles.brandLogoBox}>
                                                    <img src={item.src} className={Styles.logoImg} />
                                                </div>
                                            ))}
                                        </div>
                                    </SwiperSlide>
                                </>
                            ) : (
                                <>
                                    <SwiperSlide className={Styles.brandSlideWrap}>
                                        <div className={Styles.brandGridBox}>

                                            {brandList.map((item, idx) => (
                                                <div key={idx} className={Styles.brandLogoBox}>
                                                    <img src={item.src} className={Styles.logoImg} />
                                                </div>
                                            ))}
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className={Styles.brandSlideWrap}>
                                        <div className={Styles.brandGridBox}>
                                            {brandListTo.map((item, idx) => (
                                                <div key={idx} className={Styles.brandLogoBox}>
                                                    <img src={item.src} className={Styles.logoImg} />
                                                </div>
                                            ))}
                                        </div>
                                    </SwiperSlide>
                                </>
                            )
                        }
                        {/* 单个Slide内：2行4列布局 */}

                    </Swiper>
                    {/* 自定义分页指示器 */}
                    <div className={Styles.pageIndicatorWrap}>
                        <span
                            className={currentPageIndex === 0 ? Styles.pageActiveLine : Styles.pageNormalLine}
                            onClick={() => handlePageClick(0)}
                        ></span>
                        <span
                            className={currentPageIndex === 1 ? Styles.pageActiveLine : Styles.pageNormalLine}
                            onClick={() => handlePageClick(1)}
                        ></span>
                        {
                            isMobileTo && (
                                <span
                                    className={currentPageIndex === 2 ? Styles.pageActiveLine : Styles.pageNormalLine}
                                    onClick={() => handlePageClick(2)}
                                ></span>
                            )
                        }
                    </div>
                </div>
            </div >

            {/* Strategic Partners */}
            < div className={Styles.clientLogoContainer} >
                <div className={Styles.titleBox}>
                    <h2 className={Styles.mainTitle}>Strategic Partners</h2>
                    <span className={Styles.blueLine}></span>
                </div>
                <div className={Styles.clientDescTxt}>
                    Collaborating with industry leaders to expand our global reach and capabilities.
                </div>

                <div className={Styles.logoSwiperWrap}>
                    <Swiper
                        modules={[Mousewheel, Autoplay]}
                        slidesPerView={1} // 一页只展示1个slide（内部包含2行4列8个logo）
                        spaceBetween={24}
                        scrollbar={{ draggable: true, hide: false }}
                        mousewheel={{
                            horizontal: true,
                            forceToAxis: true
                        }}
                        autoplay={{
                            delay: 2000,        // 2秒自动切换一页
                            disableOnInteraction: false, // 用户拖拽/点击后继续自动轮播
                            // pauseOnMouseEnter: true,     // 鼠标悬浮在轮播区域时暂停轮播
                        }}
                        loop={true} // 开启无限循环轮播
                        onSwiper={getSwiperInstance}
                        onSlideChange={onSlideChangeHandler}
                        className={Styles.brandSwiper}
                    >
                        {
                            isMobileTo ? (
                                <>
                                    {/* 单个Slide内：2行4列布局 */}
                                    <SwiperSlide className={Styles.brandSlideWrap}>
                                        <div className={Styles.brandGridBox}>
                                            {strategicListThree.map((item, idx) => (
                                                <div key={idx} className={Styles.brandLogoBox}>
                                                    <img src={item.src} className={Styles.logoImg} />
                                                </div>
                                            ))}
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className={Styles.brandSlideWrap}>
                                        <div className={Styles.brandGridBox}>
                                            {strategicListFour.map((item, idx) => (
                                                <div key={idx} className={Styles.brandLogoBox}>
                                                    <img src={item.src} className={Styles.logoImg} />
                                                </div>
                                            ))}
                                        </div>
                                    </SwiperSlide>
                                </>
                            ) : (
                                <>
                                    {/* 单个Slide内：2行4列布局 */}
                                    <SwiperSlide className={Styles.brandSlideWrap}>
                                        <div className={Styles.brandGridBox}>
                                            {strategicList.map((item, idx) => (
                                                <div key={idx} className={Styles.brandLogoBox}>
                                                    <img src={item.src} className={Styles.logoImg} />
                                                </div>
                                            ))}
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className={Styles.brandSlideWrap}>
                                        <div className={Styles.brandGridBox}>
                                            {strategicListTo.map((item, idx) => (
                                                <div key={idx} className={Styles.brandLogoBox}>
                                                    <img src={item.src} className={Styles.logoImg} />
                                                </div>
                                            ))}
                                        </div>
                                    </SwiperSlide>
                                </>
                            )
                        }


                    </Swiper>
                    {/* 自定义分页指示器 */}
                    <div className={Styles.pageIndicatorWrap}>
                        <span
                            className={currentPageIndex === 0 ? Styles.pageActiveLine : Styles.pageNormalLine}
                            onClick={() => handlePageClick(0)}
                        ></span>
                        <span
                            className={currentPageIndex === 1 ? Styles.pageActiveLine : Styles.pageNormalLine}
                            onClick={() => handlePageClick(1)}
                        ></span>
                    </div>
                </div>
            </div >
            <div className={Styles.footerWrap}>
                <div className={Styles.footerContent}>
                    {/* 总部信息 */}
                    <div className={Styles.footerHeadQuarter}>
                        <p className={Styles.footerTipLabel}>Global Headquarters</p>
                        <p className={Styles.footerAddress}>160 E Tasman Dr #200, San Jose, CA 95134</p>
                        <p className={Styles.footerContact}>408.200.9891 | hires@intellipro.com</p>
                    </div>

                    {/* 全球办公室列表 */}
                    <div className={Styles.footerOfficeWrap}>
                        <p className={Styles.footerTipLabel}>Global Offices</p>
                        <div className={Styles.officeGrid}>
                            <span>Silicon Valley</span>
                            <span>Los Angeles</span>
                            <span>New York</span>
                            <span>Seattle</span>
                            <span>Dallas</span>
                            <span>Vancouver</span>
                            <span>Toronto</span>
                            <span>Montreal</span>

                            <span>London</span>
                            <span>Amsterdam</span>
                            <span>Munich</span>
                            <span>Krakow</span>
                            <span>Dublin</span>
                            <span>Beijing</span>
                            <span>Shanghai</span>
                            <span>Hangzhou</span>

                            <span>Shenzhen</span>
                            <span>Wuhan</span>
                            <span>Hong Kong</span>
                            <span>Manila</span>
                            <span>Singapore</span>
                            <span>Malaysia</span>
                            <span>Thailand</span>
                            <span>Vietnam</span>

                            <span>Indonesia</span>
                            <span>Philippines</span>
                            <span>Australia</span>
                            <span>Chennai</span>
                            <span>Mexico City</span>
                            <span>Tokyo</span>
                        </div>
                    </div>

                    {/* 底部版权与链接 */}
                    <div className={Styles.footerCopyright}>
                        <span className={Styles.footerLogo}>IntelliPro</span>
                        <span>© 2026 IntelliPro. All Rights Reserved | Terms of Use | Government Notice</span>
                    </div>
                </div>
            </div>
        </div >
    );
}
export default Home;