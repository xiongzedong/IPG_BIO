import React, { useEffect, useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Styles from './index.module.scss'
import { ReactComponent as Home1 } from '../../assets/home1.svg'
import { ReactComponent as Home2 } from '../../assets/home2.svg'
import Business5 from '../../assets/business5.png'
import Business6 from '../../assets/business6.png'
import Business7 from '../../assets/business7.png'
import { ReactComponent as Adv1 } from '../../assets/adv1.svg'
import { ReactComponent as Adv2 } from '../../assets/adv2.svg'
import { ReactComponent as Adv3 } from '../../assets/adv3.svg'
import { ReactComponent as Adv4 } from '../../assets/adv4.svg'
import { ReactComponent as Global1 } from '../../assets/global1.svg'
import { ReactComponent as Adv5 } from '../../assets/adv5.svg'
import { ReactComponent as Adv6 } from '../../assets/adv6.svg'
import { ReactComponent as Adv7 } from '../../assets/adv7.svg'
import { ReactComponent as Adv8 } from '../../assets/adv8.svg'
import { ReactComponent as Adv9 } from '../../assets/adv9.svg'
import { ReactComponent as Count1 } from '../../assets/count1.svg'


// Flexible Staffing 优势数据
const flexibleAdvantageList = [
    {
        icon: <Adv1 />,
        title: 'Speed',
        desc: 'First Candidate Submission Within 48 Hours'
    },
    {
        icon: <Adv2 />,
        title: 'Reliability',
        desc: '300 Dedicated Recruiters Across 15 Countries'
    },
    {
        icon: <Adv3 />,
        title: 'Quality Hires',
        desc: '3:1 Submit To Hire Ratio'
    },
    {
        icon: <Adv4 />,
        title: 'Best Delivery',
        desc: 'Trusted Partners Of Fortune 500 Companies And Startups'
    }
]

// HR三大方案数据
const hrSolutionList = [
    {
        title: 'EOR',
        subTitle: 'Employer Of Record',
        active: true,
        required: false,
        coverage: 'Global',
        scenarios: [
            'Worry about entity timezone',
            'Compliant global hiring'
        ],
        role: 'Employer of Record'
    },
    {
        title: 'PEO',
        subTitle: 'Professional Employer Organization',
        active: false,
        required: true,
        coverage: 'Global',
        scenarios: [
            'Reduce HR cost',
            'No in-house HR team'
        ],
        role: 'Joint Employer'
    },
    {
        title: 'HRO',
        subTitle: 'Human Resource Outsourcing',
        active: false,
        required: false,
        coverage: 'Global',
        scenarios: [
            'Worry about entity timezone',
            'Compliant global hiring',
            'Focus on core business'
        ],
        role: 'HR Service Provider'
    }
]

// BPO优势数据
const bpoAdvantageList = [
    {
        icon: <Adv5 />,
        title: 'Scalable Team Resources & Robust Global Talent Pool',
        desc: 'Robust global talent pool ready to scale with your business needs'
    },
    {
        icon: <Count1 />,
        title: '24/7 Multilingual Services',
        desc: 'Around-the-clock support across languages and time zones'
    },
    {
        icon: <Adv6 />,
        title: 'Consistent Quality Assurance',
        desc: 'Rigorous QA processes to maintain high standards of service delivery'
    },
    {
        icon: <Adv7 />,
        title: 'Comprehensive Skills Training',
        desc: 'Ongoing training programs to keep your team sharp and effective'
    },
    {
        icon: <Adv8 />,
        title: 'Customer Knowledge Base Development',
        desc: 'Structured knowledge base development for seamless customer support'
    },
    {
        icon: <Adv9 />,
        title: 'Specialized & Customizable Workflow Management',
        desc: 'Customizable workflow management tailored to your operational needs'
    }
]

// 全球办公室
const officeList = [
    'Silicon Valley', 'Los Angeles', 'New York', 'Seattle', 'Dallas', 'Vancouver', 'Toronto', 'Montreal',
    'London', 'Amsterdam', 'Munich', 'Krakow', 'Dublin', 'Beijing', 'Shanghai', 'Hangzhou',
    'Shenzhen', 'Wuhan', 'Hong Kong', 'Manila', 'Singapore', 'Malaysia', 'Thailand', 'Vietnam',
    'Indonesia', 'Philippines', 'Australia', 'Chennai', 'Mexico City', 'Tokyo'
]
const herderList = [
    { title: 'Home', path: '/home' },
    { title: 'Business Segments', path: '/business-segments' },
    { title: 'Contact', path: '/contact' }
]
const BusinessSegments = () => {
    const location = useLocation()
    // 控制侧边菜单显示隐藏
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // 判断是否移动端：宽度≤768
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isMobileTo, setIsMobileTo] = useState(window.innerWidth <= 414);
    const navList = [
        { title: 'Home', path: '/home' },
        { title: 'Business Segments', path: '/business-segments' },
        { title: 'Contact', path: '/contact' }
    ]
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

    // 打开侧边菜单
    const openMenu = () => setIsMenuOpen(true);
    // 关闭侧边菜单
    const closeMenu = () => setIsMenuOpen(false);
    return (

        <div className={Styles.wrap}>
            {/* 头部导航 */}
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

            {/* 顶部Banner区域 */}
            <div className={Styles.bannerWrap}>
                <div className={Styles.bannerLeft}>
                    <div className={Styles.sectionTag}>
                        <span className={Styles.sectionTag_icon}></span>
                        BUSINESS SEGMENTS
                    </div>
                    <h1 className={Styles.bigTitle}>
                        One Partner<br />
                        <span className={Styles.blueTitle}>Four Solutions</span><br />
                        Unlimited Global Reach
                    </h1>
                    <div className={Styles.descText}>
                        From placing your next C-suite leader to managing distributed teams across continents – IntelliPro delivers integrated talent intelligence built for organizations that think globally and hire with precision.
                    </div>

                    {/* 四个解决方案按钮 */}
                    <div className={Styles.solutionBtnWrap}>
                        <div className={Styles.btnActive}>
                            <div>01</div>
                            <div>Executive Search</div>
                        </div>
                        <div className={Styles.btnNormal}>
                            <div>02</div>
                            <div>Flexible Staffing</div>
                        </div>
                        <div className={Styles.btnNormalTo}>
                            <div>03</div>
                            <div>Global HR Solutions</div>
                        </div>
                        <div className={Styles.btnNormalTo}>
                            <div>04</div>
                            <div>
                                <div> Business Process</div>
                                <div>Outsourcing</div>
                            </div>

                        </div>
                    </div>

                    {/* 数据统计 */}
                    <div className={Styles.dataRow}>
                        <div className={Styles.dataItem}>
                            <span className={Styles.numText}>14+</span>
                            <span className={Styles.labelText}>Years of Excellence</span>
                        </div>
                        <div className={Styles.dataItem}>
                            <span className={Styles.numText}>300+</span>
                            <span className={Styles.labelText}>Dedicated Recruiters</span>
                        </div>
                        <div className={Styles.dataItem}>
                            <span className={Styles.numText}>15</span>
                            <span className={Styles.labelText}>Countries Served</span>
                        </div>
                    </div>
                </div>
                {
                    !isMobile && (
                        <div className={Styles.bannerRight}>
                            <div className={Styles.imgTop}><img src={Business5} className={Styles.logoImg} /></div>
                            <div className={Styles.imgBottomWrap}>
                                <div className={Styles.imgBottomLeft}><img src={Business6} className={Styles.logoImg} /></div>
                                <div className={Styles.imgBottomRight}><img src={Business7} className={Styles.logoImg} /></div>
                            </div>
                        </div>
                    )
                }
            </div>

            {/* Executive Search */}
            <div className={Styles.sectionWrap}>
                <div className={Styles.sectionLeft}>
                    <h2 className={Styles.sectionTitle}>
                        Executive<br />
                        <span className={Styles.blueText}>Search</span>
                    </h2>
                </div>
                <div className={Styles.sectionRight}>
                    <div className={Styles.contentText}>
                        Specializing in building diverse senior leadership teams, we employ a data-driven approach for efficient and precise searches. Our tech-enabled assessments help identify the perfect match to fuel your growth. With expertise that extends beyond placement, we support your long-term success.Recruit highly qualified candidates for senior-level and executive positions.Our expert consultants specialize in IT, engineering, legal, and finance with an average of eight years' industry experience.
                    </div>
                </div>
            </div>

            {/* Flexible Staffing */}
            <div className={Styles.sectionWrap}>
                <div className={Styles.sectionLeft}>
                    <h2 className={Styles.sectionTitle}>
                        Flexible<br />
                        <span className={Styles.blueText}>Staffing</span>
                    </h2>
                </div>
                <div className={Styles.sectionRight}>
                    <div className={Styles.contentText}>
                        IntelliPro provides tailored workforce management solutions, offering partners access to a vast candidate pool and a mix of high-tech and human-focused strategies. With 14 years of experience, our global expertise in industry trends demonstrates our comprehensive reach and capability in connecting businesses with the right talent.
                    </div>
                </div>


            </div>

            {/* Advantages */}
            <div className={Styles.sectionWrapTo}>
                <div className={Styles.advantageTitle}>
                    Advantages
                    <span className={Styles.advantageTitle_icon}></span>
                </div>
                <div className={Styles.flexibleGrid}>
                    {flexibleAdvantageList.map((item, idx) => {
                        const flag = idx === 2 || idx === 3;
                        return (
                            <div
                                key={idx}
                                className={flag ? Styles.advantageCardTo : Styles.advantageCard}
                            >
                                {
                                    isMobileTo ? (
                                        <div className={Styles.item_warp}>
                                            <div className={Styles.iconBox}>{item.icon}</div>
                                            <div className={Styles.cardTitle}>
                                                <div className={Styles.cardDescTo}> {item.title}</div>
                                                <div className={Styles.cardDesc}>{item.desc}</div>
                                            </div>

                                        </div>
                                    ) : (
                                        <>
                                            <div className={Styles.iconBox}>{item.icon}</div>
                                            <div className={Styles.cardTitle}>{item.title}</div>
                                            <div className={Styles.cardDesc}>{item.desc}</div>
                                        </>
                                    )
                                }

                            </div>
                        );
                    })}
                </div>
            </div >

            {/* Global HR Solutions */}
            <div className={Styles.sectionWrapThree}>
                <div className={Styles.sectionWrapTo_content}>
                    <div className={Styles.sectionLeft}>
                        <h2 className={Styles.sectionTitle}>
                            Global HR<br />
                            <span className={Styles.blueText}>Solutions</span>
                        </h2>
                    </div>
                    <div className={Styles.sectionRight}>
                        <div className={Styles.contentText}>
                            Three Global Workforce Management solutions: EOR, PEO and HRO, helping you simplify global team management while ensure legal compliance.
                        </div>
                    </div>
                </div>
                <div className={Styles.hrGrid}>
                    {hrSolutionList.map((item, idx) => (
                        <div key={idx} className={item.active ? Styles.hrCardActive : Styles.hrCardActiveTo}>
                            <div className={item.active ? Styles.cardHead : Styles.cardHeadTo}>
                                <div className={Styles.cardHead_text}>{item.title}</div>
                                <div className={Styles.cardHead_text_to}>{item.subTitle}</div>
                            </div>
                            <div className={Styles.cardRow}>
                                <div className={Styles.rowLabel}>OVERSEAS ENTITY REQUIRED</div>
                                <div className={item.required ? Styles.tagRed : Styles.tagGreen}>
                                    {item.required ? '✕ Required' : '✓ Not Required'}
                                </div>
                            </div>
                            <div className={Styles.cardRow}>
                                <div className={Styles.rowLabel}>SERVICE COVERAGE</div>
                                <div className={Styles.tagNormal}>🌐 {item.coverage}</div>
                            </div>
                            <div className={Styles.cardRow}>
                                <div className={Styles.rowLabel}>APPLICABLE SCENARIOS</div>
                                <div className={Styles.textList}>
                                    {item.scenarios.map((s, i) => <div key={i}><span style={{ color: '#377ded' }}>{'>'}</span> {s}</div>)}
                                </div>
                            </div>
                            <div className={Styles.cardRow}>
                                <div className={Styles.rowLabel}>INTELLIPRO ROLE</div>
                                <div className={item.active ? Styles.tagBlue : Styles.tagBlueTo}>{item.role}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* BPO */}
            <div className={Styles.sectionWrapFour}>
                <div className={Styles.sectionWrapTo_content}>
                    <div className={Styles.sectionLeft}>
                        {
                            isMobileTo ? (
                                <h2 className={Styles.sectionTitle}>
                                    Business Process<br />
                                    <span className={Styles.blueText}>Solutions</span>
                                    <span className={Styles.blueText}>（BPO）</span>
                                </h2>
                            ) : (
                                <h2 className={Styles.sectionTitle}>
                                    Business Process<br />
                                    <span className={Styles.blueText}>Solutions</span><br />
                                    <span className={Styles.blueText}>（BPO）</span>
                                </h2>
                            )
                        }

                    </div>
                    <div className={Styles.sectionRight}>
                        <div className={Styles.contentText}>
                            Enhance your business with our BPO solutions: Trust & Safety, Data Management, Technical Support, User Support, App Development, and more.
                        </div>
                    </div>
                </div>

                <div className={Styles.advantageTitle}>
                    Advantages
                    <span className={Styles.advantageTitle_icon}></span>
                </div>
                <div className={Styles.bpoGrid}>
                    {bpoAdvantageList.map((item, idx) => (
                        <div key={idx} className={Styles.advantageCardTo}>
                            <div className={Styles.iconBox}>{item.icon}</div>
                            <div className={Styles.cardTitle}>{item.title}</div>
                            <div className={Styles.cardDesc}>{item.desc}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 页脚 */}
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
    )
}

export default BusinessSegments