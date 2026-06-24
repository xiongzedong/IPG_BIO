import React, { useEffect, useState, useRef } from 'react'
import { message } from 'antd';
import { ArrowDownOutlined, EnvironmentOutlined } from '@ant-design/icons';
import Styles from './index.module.scss'
import { Link, useLocation } from 'react-router-dom'
// 顶部logo图标（沿用你现有Home页面svg）
import { ReactComponent as Home1 } from '../../assets/home1.svg'
import { ReactComponent as Home2 } from '../../assets/home2.svg'
// 总部办公楼图片
import contact1 from '../../assets/contact1.png'
import contact2 from '../../assets/contact2.jpg'


const Contact = () => {
    const location = useLocation()
    // 绑定表单区域DOM，用于滚动定位
    const formWrapRef = useRef(null);

    // 控制侧边菜单显示隐藏
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // 判断是否移动端：宽度≤768
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
    const [isMobileTo, setIsMobileTo] = useState(window.innerWidth <= 414);
    const herderList = [
        { title: 'Home', path: '/home' },
        { title: 'Business Segments', path: '/business-segments' },
        { title: 'Contact', path: '/contact' }
    ]

    // 监听窗口尺寸变化
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 1024;
            setIsMobile(mobile);
            const mobileTo = window.innerWidth <= 414;
            setIsMobileTo(mobileTo);
            // 切大屏时自动关闭侧边菜单
            if (!mobile) setIsMenuOpen(false);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 表单数据
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        message: ''
    })

    // 表单必填校验错误
    const [formError, setFormError] = useState({
        firstName: false,
        lastName: false,
        email: false,
        phoneNumber: false,
    })

    // 输入框变更
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (formError[name]) {
            setFormError(prev => ({ ...prev, [name]: false }))
        }
    }

    // 表单提交校验
    const handleSubmit = () => {
        let hasError = false
        const newError = { ...formError }

        if (!formData.firstName.trim()) {
            newError.firstName = true
            hasError = true
        }
        if (!formData.lastName.trim()) {
            newError.lastName = true
            hasError = true
        }
        if (!formData.email.trim()) {
            newError.email = true
            hasError = true
        }
        if (!formData.phoneNumber.trim()) {
            newError.phoneNumber = true
            hasError = true
        }

        setFormError(newError)

        if (hasError) {
            message.warning('Please fill in all required fields')
            return
        }

        message.success('Message submitted successfully! We will contact you soon.')
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            message: ''
        })
    }

    // 点击Contact Us 平滑滚动到表单区域
    const scrollToForm = () => {
        if (formWrapRef.current) {
            formWrapRef.current.scrollIntoView({
                behavior: 'smooth', // 平滑滚动
                block: 'start'
            })
        }
    }

    // 打开侧边菜单
    const openMenu = () => setIsMenuOpen(true);
    // 关闭侧边菜单
    const closeMenu = () => setIsMenuOpen(false);
    console.log('isMobile', isMobile, isMobileTo)
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
            {/* Banner区域 Let's Connect */}
            {
                !isMobileTo ? (
                    <div className={Styles.connectBanner}>
                        <div className={Styles.bannerLeft}>
                            <h1 className={Styles.connectTitle}>Let's<br />Connect!</h1>
                            {/* 绑定点击滚动事件 */}
                            {
                                !isMobile && (
                                    <button className={Styles.contactUsBtn} onClick={scrollToForm}>
                                        Contact Us
                                        <ArrowDownOutlined style={{ fontSize: '22px' }} />
                                    </button>
                                )
                            }

                        </div>
                        <div className={Styles.bannerRight}>
                            <img
                                src={contact1}
                                alt="customer service"
                                className={Styles.bannerImg}
                            />
                        </div>
                    </div>
                ) : (
                    <div className={Styles.connectBannerTo}>
                        <div className={Styles.bannerLeftTo}>
                            <div className={Styles.connectTitleTo}>Let's Connect!</div>
                            {/* 绑定点击滚动事件 */}
                            {
                                !isMobile && (
                                    <button className={Styles.contactUsBtnTo} onClick={scrollToForm}>
                                        Contact Us
                                        <ArrowDownOutlined style={{ fontSize: '22px' }} />
                                    </button>
                                )
                            }

                        </div>
                        <div className={Styles.bannerRightTo}>
                            <img
                                src={contact1}
                                alt="customer service"
                                className={Styles.bannerImgTo}
                            />
                        </div>
                    </div>
                )
            }

            {/* Global Headquarters 总部信息区域 */}
            {
                !isMobileTo ? (
                    <div className={Styles.headquartersWrap}>
                        <div className={Styles.sectionTitle}>Global Headquarters</div>
                        <span className={Styles.headquartersInfo}>Website: </span>
                        <a href="https://www.intelliprogroup.com" target="_blank" rel="noopener noreferrer" className={Styles.websiteLink}>
                            www.intelliprogroup.com
                        </a>

                        <div className={Styles.headquartersContent}>
                            <div className={Styles.hqImgBox}>
                                <img src={contact2} alt="San Jose Office" className={Styles.hqImg} />
                            </div>
                            <div className={Styles.hqInfo}>
                                <div className={Styles.hqCity}>San Jose</div>
                                <div className={Styles.hqText}>160 E Tasman Dr #200, San Jose, CA 95134</div>
                                <div className={Styles.hqText}>408.200.9891 | hires@intellipro.com</div>
                                <div className={Styles.mapLink}>
                                    <EnvironmentOutlined className={Styles.mapLink_img} />Find Us On Map
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={Styles.headquartersWrapTo}>
                        <div className={Styles.sectionTitleTo}>Global Headquarters</div>
                        <div className={Styles.headquartersContentTo}>
                            <div className={Styles.hqImgBoxTo}>
                                <img src={contact2} alt="San Jose Office" className={Styles.hqImgTo} />
                            </div>
                            <div className={Styles.hqInfoTo}>
                                <div className={Styles.hqCityTo}>San Jose</div>
                                <div className={Styles.hqTextTo}>160 E Tasman Dr #200, San Jose, CA 95134</div>
                                <div className={Styles.hqTextTo}>408.200.9891 | hires@intellipro.com</div>
                                <div className={Styles.mapLinkTo}>
                                    <EnvironmentOutlined className={Styles.mapLink_imgTo} />Find Us On Map
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Get In Touch 联系表单区域 绑定ref */}

            {
                !isMobileTo ? (
                    <div className={Styles.formWrap} ref={formWrapRef}>
                        <h2 className={Styles.sectionTitle}>Get In Touch</h2>
                        <div className={Styles.formGrid}>
                            <div className={Styles.formItem}>
                                <label className={Styles.formLabel}>First Name <span className={Styles.required}>*</span></label>
                                <input
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="Raymond"
                                    className={formError.firstName ? Styles.inputError : Styles.formInput}
                                />
                            </div>
                            <div className={Styles.formItem}>
                                <label className={Styles.formLabel}>Last Name <span className={Styles.required}>*</span></label>
                                <input
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Last Name"
                                    className={formError.lastName ? Styles.inputError : Styles.formInput}
                                />
                            </div>
                            <div className={Styles.formItem}>
                                <label className={Styles.formLabel}>Email <span className={Styles.required}>*</span></label>
                                <input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email"
                                    className={formError.email ? Styles.inputError : Styles.formInput}
                                />
                            </div>
                            <div className={Styles.formItem}>
                                <label className={Styles.formLabel}>Phone Number <span className={Styles.required}>*</span></label>
                                <input
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    placeholder="Phone Number"
                                    className={formError.phoneNumber ? Styles.inputError : Styles.formInput}
                                />
                            </div>
                            <div className={Styles.formItemFull}>
                                <label className={Styles.formLabel}>Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Please put your message here..."
                                    className={Styles.formTextarea}
                                />
                            </div>
                            <div className={Styles.submitWrap}>
                                <button onClick={handleSubmit} className={Styles.submitBtn}>Submit</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={Styles.formWrapTo} ref={formWrapRef}>
                        <div className={Styles.sectionTitleTo}>Get In Touch</div>
                        <div className={Styles.formGridTo}>
                            <div className={Styles.formItemTo}>
                                <label className={Styles.formLabelTo}>First Name <span className={Styles.requiredTo}>*</span></label>
                                <input
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="Raymond"
                                    className={formError.firstName ? Styles.inputErrorTo : Styles.formInputTo}
                                />
                            </div>
                            <div className={Styles.formItemTo}>
                                <label className={Styles.formLabelTo}>Last Name <span className={Styles.requiredTo}>*</span></label>
                                <input
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Last Name"
                                    className={formError.lastName ? Styles.inputErrorTo : Styles.formInputTo}
                                />
                            </div>
                            <div className={Styles.formItemTo}>
                                <label className={Styles.formLabelTo}>Email <span className={Styles.requiredTo}>*</span></label>
                                <input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email"
                                    className={formError.email ? Styles.inputErrorTo : Styles.formInputTo}
                                />
                            </div>
                            <div className={Styles.formItemTo}>
                                <label className={Styles.formLabelTo}>Phone Number <span className={Styles.requiredTo}>*</span></label>
                                <input
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    placeholder="Phone Number"
                                    className={formError.phoneNumber ? Styles.inputErrorTo : Styles.formInputTo}
                                />
                            </div>
                            <div className={Styles.formItemFullTo}>
                                <label className={Styles.formLabelTo}>Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Please put your message here..."
                                    className={Styles.formTextareaTo}
                                />
                            </div>
                            <div className={Styles.submitWrapTo}>
                                <button onClick={handleSubmit} className={Styles.submitBtnTo}>Submit</button>
                            </div>
                        </div>
                    </div>
                )
            }



            {/* 页脚（完全复用你首页Footer结构） */}
            <div className={Styles.footerWrap}>
                <div className={Styles.footerContent}>
                    <div className={Styles.footerHeadQuarter}>
                        <div className={Styles.footerTipLabel}>Global Headquarters</div>
                        <div className={Styles.footerAddress}>160 E Tasman Dr #200, San Jose, CA 95134</div>
                        <div className={Styles.footerContact}>408.200.9891 | hires@intellipro.com</div>
                    </div>

                    <div className={Styles.footerOfficeWrap}>
                        <div className={Styles.footerTipLabel}>Global Offices</div>
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

                    <div className={Styles.footerCopyright}>
                        <span className={Styles.footerLogo}>IntelliPro</span>
                        <span>© 2026 IntelliPro. All Rights Reserved | Terms of Use | Government Notice</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;