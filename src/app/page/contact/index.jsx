import React, { useEffect, useState, useRef } from 'react'
import { message, Spin } from 'antd';
import { ArrowDownOutlined, EnvironmentOutlined, CheckCircleOutlined, EditOutlined } from '@ant-design/icons';
import Styles from './index.module.scss'
import { Link, useLocation } from 'react-router-dom'
// 顶部logo图标（沿用你现有Home页面svg）
import { ReactComponent as Home1 } from '../../assets/home1.svg'
import { ReactComponent as Home2 } from '../../assets/home2.svg'
// 总部办公楼图片
import contact1 from '../../assets/contact1.png'
import contact2 from '../../assets/contact2.jpg'
import { getContactFromSubmit } from '../.../../../../apis/contact'

const Contact = () => {
    const location = useLocation()
    // 绑定表单区域DOM，用于滚动定位
    const formWrapRef = useRef(null);
    // 控制侧边菜单显示隐藏
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // 判断是否移动端：宽度≤768
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
    const [isMobileTo, setIsMobileTo] = useState(window.innerWidth <= 414);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const lastSubmitDataRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [isCount, setIsCount] = useState(false)
    const herderList = [
        { title: 'Home', path: '/home' },
        { title: 'Business Segments', path: '/business-segments' },
        { title: 'Contact', path: '/contact' }
    ]

    // 校验正则规则
    const rules = {
        // 标准邮箱格式
        emailReg: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        // 仅允许数字 + + - ( ) 空格
        phoneReg: /^[0-9+\-() ]+$/,
        phoneMinLen: 7,
        phoneMaxLen: 20,
        messageMaxLen: 5000
    }

    // ========== 新增：监听路由hash，匹配 #get-in-touch 自动滚动 ==========
    useEffect(() => {
        if (location.hash === '#get-in-touch' && formWrapRef.current) {
            setTimeout(() => {
                // 平滑滚动到表单区域
                formWrapRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })
                // 清除URL中的 #get-in-touch，不新增历史记录、不刷新页面
                window.history.replaceState({}, document.title, location.pathname)
            }, 150)
        }
    }, [location.hash])

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

    // 表单错误：同时保存错误状态 + 错误文案
    const [formError, setFormError] = useState({
        firstName: { status: false, msg: '' },
        lastName: { status: false, msg: '' },
        email: { status: false, msg: '' },
        phoneNumber: { status: false, msg: '' },
        message: { status: false, msg: '' }
    })

    // 输入框变更
    const handleInputChange = (e) => {
        const { name, value } = e.target
        // 限制Message最大5000字符
        if (name === 'message' && value.length > rules.messageMaxLen) {
            return;
        }
        setFormData(prev => ({ ...prev, [name]: value }))
        // 输入时清空当前字段错误
        if (formError[name].status) {
            setFormError(prev => ({
                ...prev,
                [name]: { status: false, msg: '' }
            }))
        }
    }
    // 深度对比两个表单对象是否完全一致
    const isSameFormData = (prevData, currentData) => {
        if (!prevData) return false;
        return (
            prevData.firstName === currentData.firstName &&
            prevData.lastName === currentData.lastName &&
            prevData.email === currentData.email &&
            prevData.phoneNumber === currentData.phoneNumber &&
            prevData.message === currentData.message
        )
    }
    // 表单提交校验
    const handleSubmit = (status) => {
        debugger
        // ===== 新增：拦截和上一次提交内容完全相同的表单 =====
        if (isSameFormData(lastSubmitDataRef.current, formData)) {
            message.warning('请勿重复提交完全相同的表单内容，请修改信息后再次提交');
            return;
        }

        let hasError = false
        const newError = {
            firstName: { status: false, msg: '' },
            lastName: { status: false, msg: '' },
            email: { status: false, msg: '' },
            phoneNumber: { status: false, msg: '' },
            message: { status: false, msg: '' }
        }

        // 1. First Name 非空校验
        if (!formData.firstName.trim()) {
            newError.firstName = { status: true, msg: 'First Name is required' }
            hasError = true
        }

        // 2. Last Name 非空校验
        if (!formData.lastName.trim()) {
            newError.lastName = { status: true, msg: 'Last Name is required' }
            hasError = true
        }

        // 3. Email 非空 + 邮箱格式校验
        if (!formData.email.trim()) {
            newError.email = { status: true, msg: 'Email is required' }
            hasError = true
        } else if (!rules.emailReg.test(formData.email.trim())) {
            newError.email = { status: true, msg: 'Please enter a valid email address' }
            hasError = true
        }

        // 4. Phone Number 非空 + 格式 + 长度校验
        const phoneVal = formData.phoneNumber.trim()
        if (!phoneVal) {
            newError.phoneNumber = { status: true, msg: 'Phone Number is required' }
            hasError = true
        } else if (!rules.phoneReg.test(phoneVal)) {
            newError.phoneNumber = { status: true, msg: 'Only numbers, + - ( ) and spaces are allowed' }
            hasError = true
        } else if (phoneVal.length < rules.phoneMinLen || phoneVal.length > rules.phoneMaxLen) {
            newError.phoneNumber = { status: true, msg: `Phone number must be ${rules.phoneMinLen}-${rules.phoneMaxLen} characters` }
            hasError = true
        }

        // 5. Message 最大字符校验
        if (formData.message.length > rules.messageMaxLen) {
            newError.message = { status: true, msg: `Message cannot exceed ${rules.messageMaxLen} characters` }
            hasError = true
        }

        setFormError(newError)

        if (hasError) {
            return
        }
        setSubmitLoading(true)
        if (status === 'edit') {
            setIsLoading(true)
        }
        let params = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            message: formData.message,
            correctionSubmit: status === 'edit' ? true : false
        }
        getContactFromSubmit(params)
            .then((res) => {
                setIsCount(true)
                setSubmitSuccess(true);
                lastSubmitDataRef.current = { ...formData };
            })
            .catch((err) => {
                message.error(err?.message)
            })
            .finally(() => {
                setIsCount(true)
                setIsLoading(false)
                setSubmitLoading(false)
            })
        // setFormData({
        //     firstName: '',
        //     lastName: '',
        //     email: '',
        //     phoneNumber: '',
        //     message: ''
        // })
    }

    const handleEdit = () => {
        handleSubmit('edit')
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
    console.log('isCount', isCount)
    return (
        <div className={Styles.wrap}>
            <div className={Styles.header}>
                <div className={Styles.headerLeft}>
                    <Link to="/home" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <Home1 />
                        <span className={Styles.headerLeft_icon}></span>
                        <Home2 />
                    </Link>
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
                    <div className={Styles.formWrap} ref={formWrapRef} id="get-in-touch">
                        <h2 className={Styles.sectionTitle}>Get In Touch</h2>
                        {
                            submitSuccess && (
                                <div className={Styles.successTipBar}>
                                    <CheckCircleOutlined style={{ color: '#00b42a', marginRight: 6 }} />
                                    Thank You! Your Message Has Been Submitted Successfully
                                </div>
                            )
                        }
                        <div className={Styles.formGrid}>
                            <div className={Styles.formItem}>
                                <label className={Styles.formLabel}>First Name <span className={Styles.required}>*</span></label>
                                <input
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="Raymond"
                                    className={formError.firstName.status ? Styles.inputError : Styles.formInput}
                                />
                                {formError.firstName.status && <p className={Styles.errorTip}>{formError.firstName.msg}</p>}
                            </div>
                            <div className={Styles.formItem}>
                                <label className={Styles.formLabel}>Last Name <span className={Styles.required}>*</span></label>
                                <input
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Last Name"
                                    className={formError.lastName.status ? Styles.inputError : Styles.formInput}
                                />
                                {formError.lastName.status && <p className={Styles.errorTip}>{formError.lastName.msg}</p>}
                            </div>
                            <div className={Styles.formItem}>
                                <label className={Styles.formLabel}>Email <span className={Styles.required}>*</span></label>
                                <input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email"
                                    className={formError.email.status ? Styles.inputError : Styles.formInput}
                                />
                                {formError.email.status && <p className={Styles.errorTip}>{formError.email.msg}</p>}
                            </div>
                            <div className={Styles.formItem}>
                                <label className={Styles.formLabel}>Phone Number <span className={Styles.required}>*</span></label>
                                <input
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    placeholder="Phone Number"
                                    className={formError.phoneNumber.status ? Styles.inputError : Styles.formInput}
                                />
                                {formError.phoneNumber.status && <p className={Styles.errorTip}>{formError.phoneNumber.msg}</p>}
                            </div>
                            <div className={Styles.formItemFull}>
                                <label className={Styles.formLabel}>Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Please put your message here..."
                                    className={Styles.formTextarea}
                                    maxLength={rules.messageMaxLen}
                                />
                                <p className={Styles.countTip}>{formData.message.length}/{rules.messageMaxLen}</p>
                                {formError.message.status && <p className={Styles.errorTip}>{formError.message.msg}</p>}
                            </div>
                            {
                                !isCount && (
                                    <div className={Styles.submitWrap}>
                                        <button onClick={handleSubmit} className={Styles.submitBtn}>
                                            {
                                                submitLoading ? <Spin style={{ color: 'white' }} /> : 'Submit'
                                            }
                                        </button>
                                    </div>
                                )
                            }

                        </div>
                        {
                            isCount && (
                                <div className={Styles.editBar}>
                                    <span className={Styles.editIcon}><EditOutlined /></span>
                                    <div className={Styles.editText}>Need To Make Changes? Update And Resubmit Below.</div>
                                    <button onClick={handleEdit} className={Styles.editBtn}>
                                        {
                                            isLoading ? (
                                                <Spin style={{ color: 'white' }} />
                                            ) : (
                                                'Edit'
                                            )
                                        }

                                    </button>
                                </div>
                            )
                        }

                    </div>
                ) : (
                    <div className={Styles.formWrapTo} ref={formWrapRef}>
                        <div className={Styles.sectionTitleTo}>Get In Touch</div>
                        {
                            submitSuccess && (
                                <div className={Styles.successTipBar}>
                                    <CheckCircleOutlined style={{ color: '#00b42a', marginRight: 6 }} />
                                    Thank You! Your Message Has Been Submitted Successfully
                                </div>
                            )
                        }
                        <div className={Styles.formGridTo}>
                            <div className={Styles.formItemTo}>
                                <label className={Styles.formLabelTo}>First Name <span className={Styles.requiredTo}>*</span></label>
                                <input
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="Raymond"
                                    className={formError.firstName.status ? Styles.inputErrorTo : Styles.formInputTo}
                                />
                                {formError.firstName.status && <p className={Styles.errorTipTo}>{formError.firstName.msg}</p>}
                            </div>
                            <div className={Styles.formItemTo}>
                                <label className={Styles.formLabelTo}>Last Name <span className={Styles.requiredTo}>*</span></label>
                                <input
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Last Name"
                                    className={formError.lastName.status ? Styles.inputErrorTo : Styles.formInputTo}
                                />
                                {formError.lastName.status && <p className={Styles.errorTipTo}>{formError.lastName.msg}</p>}
                            </div>
                            <div className={Styles.formItemTo}>
                                <label className={Styles.formLabelTo}>Email <span className={Styles.requiredTo}>*</span></label>
                                <input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email"
                                    className={formError.email.status ? Styles.inputErrorTo : Styles.formInputTo}
                                />
                                {formError.email.status && <p className={Styles.errorTipTo}>{formError.email.msg}</p>}
                            </div>
                            <div className={Styles.formItemTo}>
                                <label className={Styles.formLabelTo}>Phone Number <span className={Styles.requiredTo}>*</span></label>
                                <input
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    placeholder="Phone Number"
                                    className={formError.phoneNumber.status ? Styles.inputErrorTo : Styles.formInputTo}
                                />
                                {formError.phoneNumber.status && <p className={Styles.errorTipTo}>{formError.phoneNumber.msg}</p>}
                            </div>
                            <div className={Styles.formItemFullTo}>
                                <label className={Styles.formLabelTo}>Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Please put your message here..."
                                    className={Styles.formTextareaTo}
                                    maxLength={rules.messageMaxLen}
                                />
                                <p className={Styles.countTipTo}>{formData.message.length}/{rules.messageMaxLen}</p>
                                {formError.message.status && <p className={Styles.errorTipTo}>{formError.message.msg}</p>}
                            </div>
                            {
                                !isCount && (
                                    <div className={Styles.submitWrap}>
                                        <button onClick={handleSubmit} className={Styles.submitBtn}>
                                            {
                                                submitLoading ? <Spin style={{ color: 'white' }} /> : 'Submit'
                                            }
                                        </button>
                                    </div>
                                )
                            }


                        </div>
                        {
                            isCount && (
                                <div className={Styles.editBar}>
                                    <span className={Styles.editIcon}><EditOutlined /></span>
                                    <div className={Styles.editText}>Need To Make Changes? Update And Resubmit Below.</div>
                                    <button onClick={handleEdit} className={Styles.editBtn}>
                                        {
                                            isLoading ? (
                                                <Spin style={{ color: 'white' }} />
                                            ) : (
                                                'Edit'
                                            )
                                        }

                                    </button>
                                </div>
                            )
                        }
                    </div>
                )
            }



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
        </div>
    );
}

export default Contact;