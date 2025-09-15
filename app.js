// 법인 관리 프로그램 메인 JavaScript

class CorporateManagementApp {
    constructor() {
        this.currentUser = null;
        this.currentPage = 'dashboard';
        this.selectedCorp = null;
        this.isAdmin = false;
        
        // 사용자 정의 서류명 저장
        this.customDocumentTypes = [];
        
        // 설정 데이터
        this.settingsData = this.initializeSettingsData();
        
        // 상품 옵션 데이터
        this.productOptions = this.initializeProductOptions();
        
        // 상품 데이터
        this.products = this.initializeProducts();
        
        // 알림 발송 기록
        this.notificationLogs = this.initializeNotificationLogs();
        
        // 샘플 데이터
        this.sampleData = this.initializeSampleData();
        
        // 법인 계정 데이터
        this.corporateAccounts = this.initializeCorporateAccounts();
        
        // 현재 편집 중인 법인 계정
        this.editingCorporateAccount = null;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadSampleData();
        this.bindDirectorFormEvents();
    }
    
    initializeSettingsData() {
        return {
            categories: [
                { id: 1, name: '연금', description: '연금저축 및 퇴직연금 상품' },
                { id: 2, name: '보험', description: '생명보험 및 손해보험 상품' },
                { id: 3, name: '투자', description: '주식, 채권, 펀드 등 투자상품' },
                { id: 4, name: '예금', description: '정기예금, 적금 등 예금상품' },
                { id: 5, name: '부동산', description: '부동산 투자 및 리츠' }
            ],
            institutions: [
                { id: 1, name: '국민은행', type: '은행', contact: '1588-9999' },
                { id: 2, name: '신한은행', type: '은행', contact: '1599-8000' },
                { id: 3, name: '우리은행', type: '은행', contact: '1599-0800' },
                { id: 4, name: '하나은행', type: '은행', contact: '1599-1111' },
                { id: 5, name: 'KB증권', type: '증권', contact: '1588-0808' },
                { id: 6, name: '삼성생명', type: '보험', contact: '1588-3114' }
            ],
            assetTypes1: [
                { id: 1, name: '연금저축' },
                { id: 2, name: '퇴직연금' },
                { id: 3, name: '개인연금' },
                { id: 4, name: '주식형펀드' },
                { id: 5, name: '채권형펀드' }
            ],
            assetTypes2: [
                { id: 1, name: 'IRP' },
                { id: 2, name: 'DC형' },
                { id: 3, name: 'DB형' },
                { id: 4, name: '국내형' },
                { id: 5, name: '해외형' }
            ]
        };
    }
    
    initializeProductOptions() {
        return {
            categories: [
                { id: 1, name: '연금' },
                { id: 2, name: '보험' },
                { id: 3, name: '투자' },
                { id: 4, name: '예금' },
                { id: 5, name: '부동산' }
            ],
            institutions: [
                { id: 1, name: '삼성생명' },
                { id: 2, name: '한국투자증권' },
                { id: 3, name: '신한은행' },
                { id: 4, name: 'KB국민은행' },
                { id: 5, name: '메리츠화재' }
            ],
            paymentCycles: [
                { id: 1, name: '월납' },
                { id: 2, name: '분기납' },
                { id: 3, name: '반기납' },
                { id: 4, name: '연납' },
                { id: 5, name: '일시납' }
            ]
        };
    }
    
    initializeProducts() {
        return [
            {
                id: 1,
                name: '삼성생명 연금저축',
                category: '연금',
                institution: '삼성생명',
                assetType1: '절세자산',
                assetType2: '연금저축',
                paymentCycle: '월납'
            },
            {
                id: 2,
                name: 'KB국민은행 정기예금',
                category: '예금',
                institution: 'KB국민은행',
                assetType1: '투자자산',
                assetType2: '국내형',
                paymentCycle: '일시납'
            }
        ];
    }
    
    initializeNotificationLogs() {
        return [
            {
                id: 1,
                date: '2024-01-15',
                time: '09:30',
                target: '김철수 (삼성전자)',
                type: '임기만료 알림',
                method: '이메일',
                content: '이사 김철수님의 임기가 2주 후 만료됩니다.',
                status: '발송완료'
            },
            {
                id: 2,
                date: '2024-01-15',
                time: '10:15',
                target: '박영희 (LG화학)',
                type: '서류갱신 알림',
                method: 'SMS',
                content: '법인 등기부등본 갱신이 필요합니다.',
                status: '발송완료'
            },
            {
                id: 3,
                date: '2024-01-14',
                time: '14:20',
                target: '이민수 (현대자동차)',
                type: '임기만료 알림',
                method: '앱 푸시',
                content: '감사 이민수님의 임기가 4주 후 만료됩니다.',
                status: '발송완료'
            },
            {
                id: 4,
                date: '2024-01-14',
                time: '16:45',
                target: '최지영 (네이버)',
                type: '자산만료 알림',
                method: '이메일',
                content: '연금저축 상품이 7일 후 만료됩니다.',
                status: '발송실패'
            },
            {
                id: 5,
                date: '2024-01-13',
                time: '11:30',
                target: '정우진 (카카오)',
                type: '서류갱신 알림',
                method: 'SMS',
                content: '사업자등록증 갱신이 필요합니다.',
                status: '발송완료'
            }
        ];
    }

    bindEvents() {
        // 로그인 폼
        document.getElementById('loginForm').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('togglePassword').addEventListener('click', () => this.togglePassword());
    }

    bindMainAppEvents() {
        // 중복 바인딩 방지
        if (this.eventsBound) return;
        this.eventsBound = true;
        
        console.log('이벤트 바인딩 시작'); // 디버깅용
        
        // 전역 이벤트 위임으로 모든 클릭 처리
        document.addEventListener('click', (e) => {
            // 네비게이션 메뉴 클릭
            if (e.target.closest('.nav-item')) {
                const navItem = e.target.closest('.nav-item');
                console.log('네비게이션 클릭됨:', navItem.dataset.page); // 디버깅용
                this.navigateToPage({ target: navItem });
                return;
            }
            
            // 서브메뉴 버튼 클릭
            if (e.target.hasAttribute('data-submenu')) {
                console.log('서브메뉴 클릭됨:', e.target.dataset.submenu); // 디버깅용
                this.handleSubmenuClick(e);
                return;
            }
            
            // 설정 메뉴 클릭
            if (e.target.hasAttribute('data-settings') || e.target.closest('[data-settings]')) {
                const settingsItem = e.target.hasAttribute('data-settings') ? e.target : e.target.closest('[data-settings]');
                this.handleSettingsMenuClick(settingsItem.dataset.settings);
                return;
            }
            
            // 사용자 메뉴 클릭
            if (e.target.closest('.user-menu')) {
                e.stopPropagation();
                this.toggleUserMenu(e);
                return;
            }
            
            // 법인 선택 버튼들
            if (e.target.id === 'allCorpsBtn') {
                this.showAllCorps();
                return;
            }
            if (e.target.id === 'selectCorpBtn') {
                this.showCorpSelector();
                return;
            }
            
            // 히스토리 저장
            if (e.target.id === 'saveHistoryBtn') {
                this.saveHistory();
                return;
            }
            
            // 모달 버튼들
            const buttonId = e.target.id;
            switch(buttonId) {
                case 'addDirectorBtn':
                    this.showDirectorModal();
                    break;
                case 'saveDirectorBtn':
                    this.saveDirector();
                    break;
                case 'cancelDirectorBtn':
                    this.hideDirectorModal();
                    break;
                case 'uploadDocBtn':
                case 'uploadSettlementBtn':
                case 'uploadHrDocBtn':
                case 'uploadReportBtn':
                    this.showUploadModal();
                    break;
                case 'confirmUploadBtn':
                    this.uploadFile();
                    break;
                case 'cancelUploadBtn':
                    this.hideUploadModal();
                    break;
                case 'addTaxAssetBtn':
                    this.showAssetModal();
                    break;
                case 'saveAssetBtn':
                    this.saveAsset();
                    break;
                case 'cancelAssetBtn':
                    this.hideAssetModal();
                    break;
                case 'editSelectedBtn':
                    this.editSelectedDirectors();
                    break;
                case 'deleteSelectedBtn':
                    this.deleteSelectedDirectors();
                    break;
                case 'editSelectedAssetsBtn':
                    this.editSelectedAssets();
                    break;
                case 'deleteSelectedAssetsBtn':
                    this.deleteSelectedAssets();
                    break;
                case 'refreshBtn':
                    this.refreshData();
                    break;
                case 'closeDocumentTypeManageBtn':
                    this.hideDocumentTypeManageModal();
                    break;
                case 'addCategoryBtn':
                    this.addCategory();
                    break;
                case 'addInstitutionBtn':
                    this.addInstitution();
                    break;
                case 'addAssetType1Btn':
                    this.addAssetType(1);
                    break;
                case 'addAssetType2Btn':
                    this.addAssetType(2);
                    break;
                case 'createBackupBtn':
                    this.createBackup();
                    break;
                case 'restoreBackupBtn':
                    this.restoreBackup();
                    break;
                case 'editProfileBtn':
                    this.editProfile();
                    break;
                case 'saveProfileBtn':
                    this.saveProfile();
                    break;
                case 'cancelProfileBtn':
                    this.cancelProfileEdit();
                    break;
                case 'changePasswordBtn':
                    this.changePassword();
                    break;
                case 'refreshLogBtn':
                    this.renderNotificationLogs();
                    break;
            }
        });
        
        // 모달 이벤트
        this.bindModalEvents();
        
        // 테이블 정렬
        this.bindTableSorting();
        
        // 기타 이벤트들
        this.bindOtherEvents();
        
        console.log('이벤트 바인딩 완료'); // 디버깅용
    }

    bindModalButtons() {
        // 이사/감사 모달
        this.addButtonListener('addDirectorBtn', () => this.showDirectorModal());
        this.addButtonListener('saveDirectorBtn', () => this.saveDirector());
        this.addButtonListener('cancelDirectorBtn', () => this.hideDirectorModal());
        
        // 파일 업로드 모달
        this.addButtonListener('uploadDocBtn', () => this.showUploadModal());
        this.addButtonListener('uploadSettlementBtn', () => this.showUploadModal());
        this.addButtonListener('uploadHrDocBtn', () => this.showUploadModal());
        this.addButtonListener('uploadReportBtn', () => this.showUploadModal());
        this.addButtonListener('confirmUploadBtn', () => this.uploadFile());
        this.addButtonListener('cancelUploadBtn', () => this.hideUploadModal());
        
        // 자산 모달
        this.addButtonListener('addTaxAssetBtn', () => this.showAssetModal());
        this.addButtonListener('saveAssetBtn', () => this.saveAsset());
        this.addButtonListener('cancelAssetBtn', () => this.hideAssetModal());
        
        // 선택 수정/삭제 버튼들
        this.addButtonListener('editSelectedBtn', () => this.editSelectedDirectors());
        this.addButtonListener('deleteSelectedBtn', () => this.deleteSelectedDirectors());
        this.addButtonListener('editSelectedAssetsBtn', () => this.editSelectedAssets());
        this.addButtonListener('deleteSelectedAssetsBtn', () => this.deleteSelectedAssets());
        
        // 새로고침 버튼
        this.addButtonListener('refreshBtn', () => this.refreshData());
    }

    addButtonListener(id, handler) {
        const button = document.getElementById(id);
        if (button) {
            button.addEventListener('click', handler);
        }
    }

    initializeCorporateAccounts() {
        return [
            {
                id: 1,
                name: 'ABC 주식회사',
                ceo: '김대표',
                manager: '이담당',
                phone: '02-1234-5678',
                email: 'abc@company.com',
                password: 'abc123',
                address: '서울시 강남구 테헤란로 123',
                businessNumber: '123-45-67890',
                status: '활성',
                registrationDate: '2023-01-15',
                lastLogin: '2024-01-14 15:30',
                notificationEnabled: true,
                notes: '우수 고객사'
            },
            {
                id: 2,
                name: 'XYZ 유한회사',
                ceo: '박대표',
                manager: '최담당',
                phone: '02-2345-6789',
                email: 'xyz@company.com',
                password: 'xyz123',
                address: '서울시 서초구 서초대로 456',
                businessNumber: '234-56-78901',
                status: '활성',
                registrationDate: '2023-03-20',
                lastLogin: '2024-01-13 09:15',
                notificationEnabled: true,
                notes: '정기 미팅 고객'
            },
            {
                id: 3,
                name: 'DEF 법인',
                ceo: '정대표',
                manager: '한담당',
                phone: '02-3456-7890',
                email: 'def@company.com',
                password: 'def123',
                address: '서울시 중구 을지로 789',
                businessNumber: '345-67-89012',
                status: '비활성',
                registrationDate: '2022-11-10',
                lastLogin: '2023-12-20 14:22',
                notificationEnabled: false,
                notes: '계약 만료 예정'
            },
            {
                id: 4,
                name: 'GHI 주식회사',
                ceo: '윤대표',
                manager: '서담당',
                phone: '02-4567-8901',
                email: 'ghi@company.com',
                password: 'ghi123',
                address: '서울시 마포구 월드컵로 321',
                businessNumber: '456-78-90123',
                status: '활성',
                registrationDate: '2023-06-05',
                lastLogin: '2024-01-15 11:45',
                notificationEnabled: true,
                notes: 'VIP 고객사'
            },
            {
                id: 5,
                name: 'JKL 유한회사',
                ceo: '임대표',
                manager: '조담당',
                phone: '02-5678-9012',
                email: 'jkl@company.com',
                password: 'jkl123',
                address: '서울시 영등포구 여의대로 654',
                businessNumber: '567-89-01234',
                status: '대기',
                registrationDate: '2024-01-10',
                lastLogin: null,
                notificationEnabled: true,
                notes: '신규 가입 승인 대기'
            }
        ];
    }

    initializeSampleData() {
        return {
            corporations: [
                {
                    id: 1,
                    name: 'ABC 주식회사',
                    ceo: '김대표',
                    manager: '이담당',
                    phone: '02-1234-5678',
                    email: 'abc@company.com',
                    status: '활성',
                    notifications: 3
                },
                {
                    id: 2,
                    name: 'XYZ 유한회사',
                    ceo: '박대표',
                    manager: '최담당',
                    phone: '02-2345-6789',
                    email: 'xyz@company.com',
                    status: '활성',
                    notifications: 3
                },
                {
                    id: 3,
                    name: 'DEF 법인',
                    ceo: '정대표',
                    manager: '한담당',
                    phone: '02-3456-7890',
                    email: 'def@company.com',
                    status: '비활성',
                    notifications: 3
                },
                {
                    id: 4,
                    name: 'GHI 주식회사',
                    ceo: '윤대표',
                    manager: '서담당',
                    phone: '02-4567-8901',
                    email: 'ghi@company.com',
                    status: '활성',
                    notifications: 3
                },
                {
                    id: 5,
                    name: 'JKL 유한회사',
                    ceo: '임대표',
                    manager: '조담당',
                    phone: '02-5678-9012',
                    email: 'jkl@company.com',
                    status: '활성',
                    notifications: 3
                }
            ],
            directors: [
                {
                    id: 1,
                    corpId: 1,
                    name: '김대표',
                    position: '대표이사',
                    appointmentDate: '2021-01-15',
                    shareholderMeetingDate: '2021-03-15',
                    expiryDate: '2024-03-14',
                    notification: true,
                    fourWeekNotified: true,
                    twoWeekNotified: false
                },
                {
                    id: 2,
                    corpId: 1,
                    name: '이감사',
                    position: '감사',
                    appointmentDate: '2021-01-15',
                    shareholderMeetingDate: '2021-03-15',
                    expiryDate: '2024-03-14',
                    notification: true,
                    fourWeekNotified: true,
                    twoWeekNotified: true
                },
                {
                    id: 3,
                    corpId: 2,
                    name: '박대표',
                    position: '대표이사',
                    appointmentDate: '2022-03-01',
                    shareholderMeetingDate: '2022-04-15',
                    expiryDate: '2025-04-14',
                    notification: true,
                    fourWeekNotified: false,
                    twoWeekNotified: false
                },
                {
                    id: 4,
                    corpId: 3,
                    name: '정대표',
                    position: '대표이사',
                    appointmentDate: '2020-06-01',
                    shareholderMeetingDate: '2020-07-15',
                    expiryDate: '2023-07-14',
                    notification: false,
                    fourWeekNotified: false,
                    twoWeekNotified: false
                },
                {
                    id: 5,
                    corpId: 4,
                    name: '윤대표',
                    position: '대표이사',
                    appointmentDate: '2023-01-01',
                    shareholderMeetingDate: '2023-02-15',
                    expiryDate: '2026-02-14',
                    notification: true,
                    fourWeekNotified: false,
                    twoWeekNotified: false
                }
            ],
            documents: [
                {
                    id: 1,
                    corpId: 1,
                    name: '법인 등기부등본',
                    validPeriod: 30,
                    registrationDate: '2024-01-01',
                    expiryDate: '2024-01-31',
                    fileName: '등기부등본_ABC.pdf',
                    notification: true,
                    notes: '',
                    notificationDays: 7
                },
                {
                    id: 2,
                    corpId: 1,
                    name: '사업자등록증',
                    validPeriod: 0,
                    registrationDate: '2024-01-01',
                    expiryDate: null,
                    fileName: '사업자등록증_ABC.pdf',
                    notification: false,
                    notes: '',
                    notificationDays: 7
                },
                {
                    id: 3,
                    corpId: 2,
                    name: '법인 등기부등본',
                    validPeriod: 30,
                    registrationDate: '2024-01-15',
                    expiryDate: '2024-02-14',
                    fileName: '등기부등본_XYZ.pdf',
                    notification: true,
                    notes: '',
                    notificationDays: 7
                },
                {
                    id: 4,
                    corpId: 3,
                    name: '정관',
                    validPeriod: 0,
                    registrationDate: '2024-01-10',
                    expiryDate: null,
                    fileName: '정관_DEF.pdf',
                    notification: false,
                    notes: '',
                    notificationDays: 7
                },
                {
                    id: 5,
                    corpId: 4,
                    name: '법인 등기부등본',
                    validPeriod: 30,
                    registrationDate: '2024-01-20',
                    expiryDate: '2024-02-19',
                    fileName: '등기부등본_GHI.pdf',
                    notification: true,
                    notes: '',
                    notificationDays: 7
                },
                {
                    id: 6,
                    corpId: 5,
                    name: '법인 등기부등본',
                    validPeriod: 30,
                    registrationDate: '2024-01-05',
                    expiryDate: '2024-02-04',
                    fileName: '등기부등본_JKL.pdf',
                    notification: true,
                    notes: '최신 버전으로 업데이트 필요'
                },
                {
                    id: 7,
                    corpId: 1,
                    name: '정관',
                    validPeriod: 0,
                    registrationDate: '2023-12-15',
                    expiryDate: null,
                    fileName: '정관_ABC_2023.pdf',
                    notification: false,
                    notes: '2023년 개정본'
                },
                {
                    id: 8,
                    corpId: 2,
                    name: '주주명부',
                    validPeriod: 90,
                    registrationDate: '2024-01-10',
                    expiryDate: '2024-04-09',
                    fileName: '주주명부_XYZ_202401.xlsx',
                    notification: true,
                    notes: '분기별 업데이트 필요'
                },
                {
                    id: 9,
                    corpId: 3,
                    name: '이사회결의서',
                    validPeriod: 365,
                    registrationDate: '2023-12-01',
                    expiryDate: '2024-11-30',
                    fileName: '이사회결의서_DEF_20231201.pdf',
                    notification: true,
                    notes: '대표이사 선임 관련'
                },
                {
                    id: 10,
                    corpId: 4,
                    name: '재무제표',
                    validPeriod: 365,
                    registrationDate: '2024-01-01',
                    expiryDate: '2024-12-31',
                    fileName: '재무제표_GHI_2023.pdf',
                    notification: true,
                    notes: '2023년 감사보고서 포함'
                },
                {
                    id: 11,
                    corpId: 5,
                    name: '주주총회결의서',
                    validPeriod: 0,
                    registrationDate: '2023-11-20',
                    expiryDate: null,
                    fileName: '주주총회결의서_JKL_20231120.pdf',
                    notification: false,
                    notes: '정기주주총회 결의사항',
                    notificationDays: 7
                }
            ],
            taxAssets: [
                {
                    id: 1,
                    corpId: 1,
                    productName: '연금저축',
                    category: '연금',
                    institution: '국민은행',
                    assetType1: '연금저축',
                    assetType2: '개인연금',
                    status: 'ING',
                    paymentCycle: '월',
                    regularPayment: 100000,
                    lumpSum: 0,
                    principal: 1200000,
                    withdrawal: 0,
                    value: 1300000,
                    income: 10000,
                    startDate: '2023-01-01',
                    operatingPeriod: '12개월',
                    expectedMaturity: '2024-01-01',
                    actualMaturity: null,
                    originalMaturity: '2024-01-01',
                    currency: 'KRW',
                    totalExpectedReturn: 8.5,
                    annualExpectedReturn: 8.5,
                    notes: '정기 납입 중'
                },
                {
                    id: 2,
                    corpId: 1,
                    productName: 'IRP',
                    category: '퇴직연금',
                    institution: '신한은행',
                    assetType1: '퇴직연금',
                    assetType2: 'IRP',
                    status: 'ING',
                    paymentCycle: '월',
                    regularPayment: 200000,
                    lumpSum: 500000,
                    principal: 2900000,
                    withdrawal: 0,
                    value: 3100000,
                    income: 20000,
                    startDate: '2022-06-01',
                    operatingPeriod: '18개월',
                    expectedMaturity: '2025-06-01',
                    actualMaturity: null,
                    originalMaturity: '2025-06-01',
                    currency: 'KRW',
                    totalExpectedReturn: 7.2,
                    annualExpectedReturn: 7.2,
                    notes: '회사 매칭'
                },
                {
                    id: 3,
                    corpId: 2,
                    productName: '연금저축',
                    category: '연금',
                    institution: '우리은행',
                    assetType1: '연금저축',
                    assetType2: '개인연금',
                    status: 'ING',
                    paymentCycle: '월',
                    regularPayment: 150000,
                    lumpSum: 0,
                    principal: 1800000,
                    withdrawal: 0,
                    value: 1950000,
                    income: 15000,
                    startDate: '2023-03-01',
                    operatingPeriod: '10개월',
                    expectedMaturity: '2024-03-01',
                    actualMaturity: null,
                    originalMaturity: '2024-03-01',
                    currency: 'KRW',
                    totalExpectedReturn: 8.3,
                    annualExpectedReturn: 8.3,
                    notes: '고액 납입'
                },
                {
                    id: 4,
                    corpId: 3,
                    productName: 'IRP',
                    category: '퇴직연금',
                    institution: '하나은행',
                    assetType1: '퇴직연금',
                    assetType2: 'IRP',
                    status: 'EXIT',
                    paymentCycle: '월',
                    regularPayment: 100000,
                    lumpSum: 0,
                    principal: 1200000,
                    withdrawal: 1200000,
                    value: 0,
                    income: 0,
                    startDate: '2021-01-01',
                    operatingPeriod: '24개월',
                    expectedMaturity: '2023-01-01',
                    actualMaturity: '2023-01-01',
                    originalMaturity: '2023-01-01',
                    currency: 'KRW',
                    totalExpectedReturn: 6.5,
                    annualExpectedReturn: 6.5,
                    notes: '만기 해지'
                },
                {
                    id: 5,
                    corpId: 4,
                    productName: '연금저축',
                    category: '연금',
                    institution: 'KB증권',
                    assetType1: '연금저축',
                    assetType2: '개인연금',
                    status: 'ING',
                    paymentCycle: '월',
                    regularPayment: 200000,
                    lumpSum: 1000000,
                    principal: 3400000,
                    withdrawal: 0,
                    value: 3600000,
                    income: 20000,
                    startDate: '2022-01-01',
                    operatingPeriod: '24개월',
                    expectedMaturity: '2025-01-01',
                    actualMaturity: null,
                    originalMaturity: '2025-01-01',
                    currency: 'KRW',
                    totalExpectedReturn: 5.9,
                    annualExpectedReturn: 5.9,
                    notes: '증권사 상품'
                }
            ],
            history: [
                {
                    id: 1,
                    date: '2024-01-15',
                    corpName: 'ABC 주식회사',
                    manager: '이담당',
                    corpManager: '김실무',
                    content: '월간 자산 현황 보고서 검토 및 피드백 제공'
                },
                {
                    id: 2,
                    date: '2024-01-14',
                    corpName: 'XYZ 유한회사',
                    manager: '최담당',
                    corpManager: '박실무',
                    content: '연금저축 상품 가입 상담 및 계약 체결'
                },
                {
                    id: 3,
                    date: '2024-01-13',
                    corpName: 'DEF 법인',
                    manager: '한담당',
                    corpManager: '정실무',
                    content: '법인 등기부등본 갱신 안내 및 서류 업로드'
                },
                {
                    id: 4,
                    date: '2024-01-12',
                    corpName: 'GHI 주식회사',
                    manager: '서담당',
                    corpManager: '윤실무',
                    content: '분기별 재무제표 검토 및 분석 보고서 작성'
                },
                {
                    id: 5,
                    date: '2024-01-11',
                    corpName: 'JKL 유한회사',
                    manager: '조담당',
                    corpManager: '임실무',
                    content: '이사 임기 만료 알림 및 갱신 절차 안내'
                }
            ],
            notifications: [
                // ABC 주식회사 알림
                {
                    id: 1,
                    corpId: 1,
                    corpName: 'ABC 주식회사',
                    title: '법인 등기부등본 만료 예정',
                    content: '법인 등기부등본이 2024년 1월 31일에 만료됩니다. 갱신이 필요합니다.',
                    type: 'warning',
                    date: '2024-01-15',
                    isRead: false
                },
                {
                    id: 2,
                    corpId: 1,
                    corpName: 'ABC 주식회사',
                    title: '이사 임기 만료 예정',
                    content: '김대표 이사의 임기가 2024년 1월 15일에 만료됩니다.',
                    type: 'danger',
                    date: '2024-01-10',
                    isRead: false
                },
                {
                    id: 3,
                    corpId: 1,
                    corpName: 'ABC 주식회사',
                    title: '월간 자산 보고서 제출',
                    content: '1월 월간 자산 현황 보고서가 제출되었습니다.',
                    type: 'info',
                    date: '2024-01-05',
                    isRead: true
                },
                
                // XYZ 유한회사 알림
                {
                    id: 4,
                    corpId: 2,
                    corpName: 'XYZ 유한회사',
                    title: '연금저축 만기 도래',
                    content: '연금저축 상품이 2024년 3월 1일에 만기됩니다.',
                    type: 'warning',
                    date: '2024-01-14',
                    isRead: false
                },
                {
                    id: 5,
                    corpId: 2,
                    corpName: 'XYZ 유한회사',
                    title: '법인세 신고 기한',
                    content: '2023년 법인세 신고 기한이 다가오고 있습니다.',
                    type: 'warning',
                    date: '2024-01-12',
                    isRead: false
                },
                {
                    id: 6,
                    corpId: 2,
                    corpName: 'XYZ 유한회사',
                    title: '신규 상품 가입 완료',
                    content: '연금저축 상품 가입이 완료되었습니다.',
                    type: 'success',
                    date: '2024-01-08',
                    isRead: true
                },
                
                // DEF 법인 알림
                {
                    id: 7,
                    corpId: 3,
                    corpName: 'DEF 법인',
                    title: '정관 업데이트 필요',
                    content: '법인 정관 업데이트가 필요합니다.',
                    type: 'info',
                    date: '2024-01-13',
                    isRead: false
                },
                {
                    id: 8,
                    corpId: 3,
                    corpName: 'DEF 법인',
                    title: '휴면법인 해제 절차',
                    content: '휴면법인 해제 절차를 진행해주세요.',
                    type: 'danger',
                    date: '2024-01-11',
                    isRead: false
                },
                {
                    id: 9,
                    corpId: 3,
                    corpName: 'DEF 법인',
                    title: '서류 보관 기간 만료',
                    content: '일부 서류의 보관 기간이 만료되었습니다.',
                    type: 'warning',
                    date: '2024-01-09',
                    isRead: false
                },
                
                // GHI 주식회사 알림
                {
                    id: 10,
                    corpId: 4,
                    corpName: 'GHI 주식회사',
                    title: '분기별 재무제표 제출',
                    content: '4분기 재무제표 제출이 완료되었습니다.',
                    type: 'success',
                    date: '2024-01-12',
                    isRead: true
                },
                {
                    id: 11,
                    corpId: 4,
                    corpName: 'GHI 주식회사',
                    title: '자산 평가 일정',
                    content: '자산 평가 일정이 예정되어 있습니다.',
                    type: 'info',
                    date: '2024-01-10',
                    isRead: false
                },
                {
                    id: 12,
                    corpId: 4,
                    corpName: 'GHI 주식회사',
                    title: '배당금 지급 안내',
                    content: '2023년 배당금 지급이 예정되어 있습니다.',
                    type: 'info',
                    date: '2024-01-07',
                    isRead: false
                },
                
                // JKL 유한회사 알림
                {
                    id: 13,
                    corpId: 5,
                    corpName: 'JKL 유한회사',
                    title: '신규 투자 상품 추천',
                    content: '고객님께 적합한 신규 투자 상품을 추천드립니다.',
                    type: 'info',
                    date: '2024-01-11',
                    isRead: false
                },
                {
                    id: 14,
                    corpId: 5,
                    corpName: 'JKL 유한회사',
                    title: '월간 수익률 보고',
                    content: '12월 월간 수익률 보고서가 준비되었습니다.',
                    type: 'success',
                    date: '2024-01-06',
                    isRead: true
                },
                {
                    id: 15,
                    corpId: 5,
                    corpName: 'JKL 유한회사',
                    title: '계약 갱신 안내',
                    content: '투자 상품 계약 갱신 시기가 다가왔습니다.',
                    type: 'warning',
                    date: '2024-01-04',
                    isRead: false
                }
            ]
        };
    }

    loadSampleData() {
        this.renderCorpTable();
        this.renderHistoryTable();
        this.renderDirectorsTable();
        this.renderDocumentsTable();
        this.renderTaxAssetsTable();
        this.populateHistoryCorpSelect();
    }

    handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // 데모 계정 체크
        if (email === 'admin@drgm.com' && password === 'admin') {
            this.currentUser = { email, role: 'admin', name: '관리자' };
            this.isAdmin = true;
            this.showMainApp();
        } else if (email === 'guest@company.com' && password === 'guest') {
            this.currentUser = { email, role: 'corp', name: '법인 사용자' };
            this.isAdmin = false;
            this.showMainApp();
        } else {
            alert('이메일 또는 비밀번호가 일치하지 않습니다.');
        }
    }

    showMainApp() {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('mainApp').style.display = 'flex';
        
        // 사용자 정보 업데이트
        document.getElementById('userName').textContent = this.currentUser.name;
        
        // 관리사/법인에 따른 UI 조정
        if (this.isAdmin) {
            document.getElementById('corpSelector').style.display = 'block';
            document.getElementById('noticeActions').style.display = 'block';
        } else {
            document.getElementById('corpSelector').style.display = 'none';
            document.getElementById('noticeActions').style.display = 'none';
        }
        
        // 즉시 이벤트 바인딩
        this.bindMainAppEvents();
        this.navigateToPage({ target: { dataset: { page: 'dashboard' } } });
    }

    togglePassword() {
        const passwordInput = document.getElementById('password');
        const toggleIcon = document.getElementById('togglePassword');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleIcon.classList.remove('fa-eye');
            toggleIcon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            toggleIcon.classList.remove('fa-eye-slash');
            toggleIcon.classList.add('fa-eye');
        }
    }

    navigateToPage(e) {
        const target = e.target || e;
        const page = target.dataset?.page;
        console.log('네비게이션 클릭:', page); // 디버깅용
        
        if (!page) {
            console.log('페이지 정보 없음');
            return;
        }
        
        // 네비게이션 활성화
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        if (target.classList) {
            target.classList.add('active');
        }
        
        // 페이지 전환
        document.querySelectorAll('.page').forEach(p => {
            p.classList.remove('active');
        });
        
        const targetPage = document.getElementById(page + 'Page');
        if (targetPage) {
            targetPage.classList.add('active');
            console.log('페이지 전환 성공:', page);
        } else {
            console.log('페이지를 찾을 수 없음:', page + 'Page');
        }
        
        this.currentPage = page;
        
        // 설정 페이지인 경우 초기화
        if (page === 'settings') {
            this.initializeSettingsPage();
        }
    }

    toggleUserMenu(e) {
        e.stopPropagation();
        const dropdown = document.querySelector('.user-dropdown');
        dropdown.classList.toggle('show');
    }

    showAllCorps() {
        document.getElementById('allCorpsBtn').classList.add('active');
        document.getElementById('selectCorpBtn').classList.remove('active');
        document.getElementById('selectedCorp').style.display = 'none';
        this.selectedCorp = null;
        this.renderCorpTable();
    }

    showCorpSelector() {
        document.getElementById('selectCorpBtn').classList.add('active');
        document.getElementById('allCorpsBtn').classList.remove('active');
        
        // 법인 선택 모달 표시 (간단한 구현)
        const corpName = prompt('법인명을 입력하세요:', 'ABC 주식회사');
        if (corpName) {
            this.selectedCorp = this.sampleData.corporations.find(corp => corp.name === corpName);
            if (this.selectedCorp) {
                document.getElementById('selectedCorpName').textContent = this.selectedCorp.name;
                document.getElementById('selectedCorp').style.display = 'flex';
                this.renderCorpTable();
            }
        }
    }

    renderCorpTable() {
        const tbody = document.getElementById('corpTableBody');
        const corps = this.selectedCorp ? [this.selectedCorp] : this.sampleData.corporations;
        
        tbody.innerHTML = corps.map(corp => `
            <tr>
                <td><input type="checkbox"></td>
                <td>${corp.name}</td>
                <td>${corp.ceo}</td>
                <td>${corp.manager}</td>
                <td>${corp.phone}</td>
                <td><span class="status-badge status-${corp.status === '활성' ? 'active' : 'danger'}">${corp.status}</span></td>
                <td>${corp.notifications > 0 ? `<span class="notification-badge notification-clickable" onclick="app.showCorpNotifications(${corp.id})">${corp.notifications}</span>` : ''}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn view" onclick="app.viewCorp(${corp.id})">보기</button>
                        ${this.isAdmin ? `<button class="action-btn edit" onclick="app.editCorp(${corp.id})">수정</button>` : ''}
                    </div>
                </td>
            </tr>
        `).join('');
    }

    renderHistoryTable() {
        const tbody = document.getElementById('historyTableBody');
        const history = this.isAdmin ? this.sampleData.history : this.sampleData.history.filter(h => h.corpName === this.selectedCorp?.name);
        
        tbody.innerHTML = history.map(h => `
            <tr>
                <td>${h.date}</td>
                <td><span class="corp-name-clickable" onclick="app.selectCorpFromHistory('${h.corpName}')">${h.corpName}</span></td>
                <td>${h.manager}</td>
                <td>${h.content}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn edit" onclick="app.editHistory(${h.id})">수정</button>
                        <button class="action-btn delete" onclick="app.deleteHistory(${h.id})">삭제</button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    renderDirectorsTable() {
        const tbody = document.getElementById('directorsTableBody');
        const directors = this.isAdmin ? this.sampleData.directors : this.sampleData.directors.filter(d => d.corpId === this.selectedCorp?.id);
        
        tbody.innerHTML = directors.map(d => {
            let notificationStatus = '';
            if (d.notification) {
                const notifications = [];
                if (d.fourWeekNotified) notifications.push('4주전');
                if (d.twoWeekNotified) notifications.push('2주전');
                
                if (notifications.length > 0) {
                    notificationStatus = `활성 (${notifications.join(', ')} 완료)`;
                } else {
                    notificationStatus = '활성 (대기중)';
                }
            } else {
                notificationStatus = '비활성';
            }
            
            return `
                <tr>
                    <td><input type="checkbox"></td>
                    <td>${d.name}</td>
                    <td>${d.position}</td>
                    <td>${d.appointmentDate}</td>
                    <td>${d.expiryDate}</td>
                    <td>
                        <span class="status-badge status-${d.notification ? 'active' : 'danger'}">
                            ${notificationStatus}
                        </span>
                    </td>
                    <td>
                        <div class="action-buttons">
                            <button class="action-btn edit" onclick="app.editDirector(${d.id})">수정</button>
                            <button class="action-btn delete" onclick="app.deleteDirector(${d.id})">삭제</button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    renderDocumentsTable() {
        const tbody = document.getElementById('documentsTableBody');
        const documents = this.isAdmin ? this.sampleData.documents : this.sampleData.documents.filter(d => d.corpId === this.selectedCorp?.id);
        
        tbody.innerHTML = documents.map(d => `
            <tr>
                <td><input type="checkbox"></td>
                <td>${d.name}</td>
                <td>${d.validPeriod === 0 ? '무제한' : d.validPeriod + '일'}</td>
                <td>${d.registrationDate}</td>
                <td>${d.expiryDate || '무제한'}</td>
                <td><span class="status-badge status-${d.notification ? 'active' : 'danger'}">${d.notification ? '활성' : '비활성'}</span></td>
                <td>${d.notes || '-'}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn view" onclick="app.viewDocument('${d.fileName}')">보기</button>
                        <button class="action-btn delete" onclick="app.downloadDocument('${d.fileName}')">다운로드</button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    renderTaxAssetsTable() {
        const tbody = document.getElementById('taxAssetsTableBody');
        const assets = this.isAdmin ? this.sampleData.taxAssets : this.sampleData.taxAssets.filter(a => a.corpId === this.selectedCorp?.id);
        
        tbody.innerHTML = assets.map(a => `
            <tr>
                <td><input type="checkbox"></td>
                <td>${a.productName}</td>
                <td>${a.category}</td>
                <td>${a.institution}</td>
                <td>${a.assetType1}</td>
                <td>${a.assetType2}</td>
                <td><span class="status-badge status-${a.status === 'ING' ? 'active' : 'danger'}">${a.status}</span></td>
                <td>${a.paymentCycle}</td>
                <td>${a.regularPayment.toLocaleString()}</td>
                <td>${a.lumpSum.toLocaleString()}</td>
                <td>${a.principal.toLocaleString()}</td>
                <td>${a.withdrawal.toLocaleString()}</td>
                <td>${a.value.toLocaleString()}</td>
                <td>${a.income.toLocaleString()}</td>
                <td>${a.startDate}</td>
                <td>${a.operatingPeriod}</td>
                <td>${a.expectedMaturity}</td>
                <td>${a.actualMaturity || '-'}</td>
                <td>${a.originalMaturity}</td>
                <td>${a.currency}</td>
                <td>${a.totalExpectedReturn}%</td>
                <td>${a.annualExpectedReturn}%</td>
                <td>${a.notes}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn edit" onclick="app.editAsset(${a.id})">수정</button>
                        <button class="action-btn delete" onclick="app.deleteAsset(${a.id})">삭제</button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    saveHistory() {
        const date = document.getElementById('historyDate').value;
        const corpName = document.getElementById('historyCorp').value;
        const manager = document.getElementById('historyManager').value;
        const content = document.getElementById('historyContent').value;
        
        if (!date || !corpName || !manager || !content) {
            alert('모든 필수 항목을 입력해주세요.');
            return;
        }
        
        const newHistory = {
            id: this.sampleData.history.length + 1,
            date,
            corpName,
            manager,
            content
        };
        
        this.sampleData.history.unshift(newHistory);
        this.renderHistoryTable();
        
        // 폼 초기화
        this.clearHistoryForm();
        
        alert('히스토리가 저장되었습니다.');
    }

    bindModalEvents() {
        // 모달 닫기 - 이벤트 위임 사용
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('close')) {
                e.target.closest('.modal').classList.remove('show');
            }
        });
        
        // 모달 외부 클릭 시 닫기
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.classList.remove('show');
            }
        });
    }

    showDirectorModal() {
        document.getElementById('directorModal').classList.add('show');
        document.getElementById('directorForm').reset();
    }

    hideDirectorModal() {
        document.getElementById('directorModal').classList.remove('show');
    }

    saveDirector() {
        const name = document.getElementById('directorName').value;
        const position = document.getElementById('directorPosition').value;
        const appointmentDate = document.getElementById('directorAppointmentDate').value;
        const shareholderMeetingDate = document.getElementById('expectedShareholderMeeting').value;
        const notification = document.getElementById('directorNotification').checked;
        const expiryDate = document.getElementById('directorExpiryDate').value;
        
        if (!name || !position || !appointmentDate || !shareholderMeetingDate) {
            alert('모든 필수 항목을 입력해주세요.');
            return;
        }
        
        const newDirector = {
            id: this.sampleData.directors.length + 1,
            corpId: this.selectedCorp?.id || 1,
            name,
            position,
            appointmentDate,
            shareholderMeetingDate,
            expiryDate,
            notification,
            fourWeekNotified: false,
            twoWeekNotified: false
        };
        
        this.sampleData.directors.push(newDirector);
        this.renderDirectorsTable();
        this.hideDirectorModal();
        
        alert('이사/감사 정보가 저장되었습니다.');
    }

    showUploadModal() {
        document.getElementById('uploadModal').classList.add('show');
        document.getElementById('uploadForm').reset();
        document.getElementById('customDocumentGroup').style.display = 'none';
        document.getElementById('documentNotification').checked = true;
        
        // 서류명 선택 이벤트 바인딩
        const documentSelect = document.getElementById('documentName');
        const customGroup = document.getElementById('customDocumentGroup');
        
        // 기존 이벤트 리스너 제거
        const newDocumentSelect = documentSelect.cloneNode(true);
        documentSelect.parentNode.replaceChild(newDocumentSelect, documentSelect);
        
        newDocumentSelect.addEventListener('change', (e) => {
            if (e.target.value === '기타') {
                customGroup.style.display = 'block';
                document.getElementById('customDocumentName').required = true;
            } else {
                customGroup.style.display = 'none';
                document.getElementById('customDocumentName').required = false;
            }
        });
        
        // 서류명 추가 버튼 이벤트
        const addDocumentTypeBtn = document.getElementById('addDocumentTypeBtn');
        if (addDocumentTypeBtn) {
            addDocumentTypeBtn.addEventListener('click', () => {
                this.showAddDocumentTypeModal();
            });
        }
        
        // 서류명 관리 버튼 이벤트
        const manageDocumentTypeBtn = document.getElementById('manageDocumentTypeBtn');
        if (manageDocumentTypeBtn) {
            manageDocumentTypeBtn.addEventListener('click', () => {
                this.showDocumentTypeManageModal();
            });
        }
        
        // 유효기간 변경 시 알림 상태 자동 조정
        const validityInput = document.getElementById('validityPeriod');
        const notificationCheckbox = document.getElementById('documentNotification');
        
        validityInput.addEventListener('input', (e) => {
            const value = parseInt(e.target.value) || 0;
            if (value === 0) {
                notificationCheckbox.checked = false;
                notificationCheckbox.disabled = true;
            } else {
                notificationCheckbox.disabled = false;
                notificationCheckbox.checked = true;
            }
        });
    }

    hideUploadModal() {
        document.getElementById('uploadModal').classList.remove('show');
    }

    uploadFile() {
        const fileInput = document.getElementById('fileInput');
        const documentName = document.getElementById('documentName').value;
        const customDocumentName = document.getElementById('customDocumentName').value;
        const validityPeriod = parseInt(document.getElementById('validityPeriod').value) || 0;
        const notificationEnabled = document.getElementById('documentNotification').checked;
        const notes = document.getElementById('documentNotes').value;
        
        if (!fileInput.files.length) {
            alert('파일을 선택해주세요.');
            return;
        }
        
        if (!documentName) {
            alert('서류명을 선택해주세요.');
            return;
        }
        
        if (documentName === '기타' && !customDocumentName) {
            alert('기타 서류명을 입력해주세요.');
            return;
        }
        
        const file = fileInput.files[0];
        const finalDocumentName = documentName === '기타' ? customDocumentName : documentName;
        
        // 만료일 계산
        const registrationDate = new Date();
        let expiryDate = null;
        if (validityPeriod > 0) {
            expiryDate = new Date(registrationDate);
            expiryDate.setDate(expiryDate.getDate() + validityPeriod);
        }
        
        // 새 문서 객체 생성
        const newDocument = {
            id: this.sampleData.documents.length + 1,
            corpId: this.selectedCorp?.id || 1,
            name: finalDocumentName,
            validPeriod: validityPeriod,
            registrationDate: registrationDate.toISOString().split('T')[0],
            expiryDate: expiryDate ? expiryDate.toISOString().split('T')[0] : null,
            fileName: file.name,
            notification: validityPeriod > 0 && notificationEnabled,
            notes: notes,
            notificationDays: 7 // 7일 전 알림
        };
        
        // 샘플 데이터에 추가
        this.sampleData.documents.push(newDocument);
        
        // 서류명이 기타인 경우 드롭다운에 추가
        if (documentName === '기타' && customDocumentName) {
            this.addCustomDocumentType(customDocumentName);
        }
        
        // 테이블 새로고침
        this.renderDocumentsTable();
        
        // 모달 닫기
        this.hideUploadModal();
        
        alert(`${finalDocumentName} 파일이 성공적으로 업로드되었습니다.`);
    }

    showAssetModal() {
        document.getElementById('assetModal').classList.add('show');
        document.getElementById('assetForm').reset();
    }

    hideAssetModal() {
        document.getElementById('assetModal').classList.remove('show');
    }

    saveAsset() {
        const formData = new FormData(document.getElementById('assetForm'));
        const assetData = Object.fromEntries(formData.entries());
        
        if (!assetData.assetName) {
            alert('상품명을 입력해주세요.');
            return;
        }
        
        const newAsset = {
            id: this.sampleData.taxAssets.length + 1,
            corpId: this.selectedCorp?.id || 1,
            ...assetData,
            regularPayment: parseFloat(assetData.assetRegularPayment) || 0,
            lumpSum: parseFloat(assetData.assetLumpSum) || 0,
            principal: parseFloat(assetData.assetPrincipal) || 0,
            withdrawal: parseFloat(assetData.assetWithdrawal) || 0,
            value: parseFloat(assetData.assetValue) || 0,
            income: parseFloat(assetData.assetIncome) || 0
        };
        
        this.sampleData.taxAssets.push(newAsset);
        this.renderTaxAssetsTable();
        this.hideAssetModal();
        
        alert('자산 정보가 저장되었습니다.');
    }

    bindOtherEvents() {
        // 검색 기능
        const corpSearch = document.getElementById('corpSearch');
        if (corpSearch) {
            corpSearch.addEventListener('input', (e) => this.searchCorps(e.target.value));
        }

        // 체크박스 전체 선택
        this.bindCheckboxEvents();
    }

    bindCheckboxEvents() {
        // 전체 선택 체크박스들
        const selectAllCheckboxes = document.querySelectorAll('input[type="checkbox"][id^="selectAll"]');
        selectAllCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => this.handleSelectAll(e));
        });

        // 개별 체크박스들
        document.addEventListener('change', (e) => {
            if (e.target.type === 'checkbox' && e.target.closest('tbody')) {
                this.updateActionButtons();
            }
        });
    }

    handleSubmenuClick(e) {
        e.preventDefault();
        const submenu = e.target.dataset.submenu;
        const page = e.target.closest('.page');
        
        console.log('서브메뉴 클릭:', submenu); // 디버깅용
        
        if (!page || !submenu) {
            console.log('페이지 또는 서브메뉴 정보 없음');
            return;
        }

        // 모든 서브메뉴 버튼 비활성화
        page.querySelectorAll('[data-submenu]').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // 클릭한 버튼 활성화
        e.target.classList.add('active');
        
        // 모든 서브메뉴 콘텐츠 숨기기
        page.querySelectorAll('.submenu-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // 해당 서브메뉴 콘텐츠 보이기
        const targetContent = page.querySelector(`#${submenu}Submenu`);
        if (targetContent) {
            targetContent.classList.add('active');
            console.log('서브메뉴 전환 성공:', submenu);
        } else {
            console.log('서브메뉴 콘텐츠를 찾을 수 없음:', `${submenu}Submenu`);
        }
    }

    refreshData() {
        this.loadSampleData();
        alert('데이터가 새로고침되었습니다.');
    }

    searchCorps(query) {
        const tbody = document.getElementById('corpTableBody');
        if (!tbody) return;
        
        const rows = tbody.querySelectorAll('tr');
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            if (text.includes(query.toLowerCase())) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    handleSelectAll(e) {
        const isChecked = e.target.checked;
        const table = e.target.closest('table');
        if (!table) return;
        
        const checkboxes = table.querySelectorAll('tbody input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = isChecked;
        });
        
        // 선택된 항목에 따른 버튼 활성화/비활성화
        this.updateActionButtons();
    }

    updateActionButtons() {
        // 선택된 항목에 따라 액션 버튼들 활성화/비활성화
        const editButtons = document.querySelectorAll('#editSelectedBtn, #editSelectedAssetsBtn');
        const deleteButtons = document.querySelectorAll('#deleteSelectedBtn, #deleteSelectedAssetsBtn');
        
        const hasSelection = document.querySelector('tbody input[type="checkbox"]:checked');
        const hasSelectionValue = hasSelection !== null;
        
        editButtons.forEach(btn => {
            btn.disabled = !hasSelectionValue;
        });
        
        deleteButtons.forEach(btn => {
            btn.disabled = !hasSelectionValue;
        });
    }

    bindTableSorting() {
        // 테이블 정렬 기능 (간단한 구현)
        window.sortTable = (column) => {
            console.log(`정렬: ${column}`);
            // 실제 정렬 로직 구현
        };
    }

    // 액션 메서드들
    viewCorp(id) {
        const corp = this.sampleData.corporations.find(c => c.id === id);
        alert(`법인 정보: ${corp.name}\n대표자: ${corp.ceo}\n담당자: ${corp.manager}`);
    }

    editCorp(id) {
        alert(`법인 ${id} 수정 기능`);
    }

    viewDocument(fileName) {
        // PDF 뷰어 모달 표시
        document.getElementById('pdfTitle').textContent = fileName;
        document.getElementById('pdfViewer').src = `../sample-documents/${fileName}`;
        document.getElementById('pdfModal').classList.add('show');
    }

    downloadDocument(fileName) {
        alert(`파일 다운로드: ${fileName}`);
    }

    editDirector(id) {
        alert(`이사/감사 ${id} 수정 기능`);
    }

    deleteDirector(id) {
        if (confirm('정말 삭제하시겠습니까?')) {
            this.sampleData.directors = this.sampleData.directors.filter(d => d.id !== id);
            this.renderDirectorsTable();
            alert('삭제되었습니다.');
        }
    }

    editAsset(id) {
        alert(`자산 ${id} 수정 기능`);
    }

    deleteAsset(id) {
        if (confirm('정말 삭제하시겠습니까?')) {
            this.sampleData.taxAssets = this.sampleData.taxAssets.filter(a => a.id !== id);
            this.renderTaxAssetsTable();
            alert('삭제되었습니다.');
        }
    }

    editHistory(id) {
        alert(`히스토리 ${id} 수정 기능`);
    }

    deleteHistory(id) {
        if (confirm('정말 삭제하시겠습니까?')) {
            this.sampleData.history = this.sampleData.history.filter(h => h.id !== id);
            this.renderHistoryTable();
            alert('삭제되었습니다.');
        }
    }

    // 선택된 항목들 처리 메서드들
    editSelectedDirectors() {
        const selectedIds = this.getSelectedIds('directorsTableBody');
        if (selectedIds.length === 0) {
            alert('수정할 항목을 선택해주세요.');
            return;
        }
        if (selectedIds.length > 1) {
            alert('한 번에 하나의 항목만 수정할 수 있습니다.');
            return;
        }
        this.editDirector(selectedIds[0]);
    }

    deleteSelectedDirectors() {
        const selectedIds = this.getSelectedIds('directorsTableBody');
        if (selectedIds.length === 0) {
            alert('삭제할 항목을 선택해주세요.');
            return;
        }
        if (confirm(`선택된 ${selectedIds.length}개 항목을 삭제하시겠습니까?`)) {
            selectedIds.forEach(id => {
                this.sampleData.directors = this.sampleData.directors.filter(d => d.id !== id);
            });
            this.renderDirectorsTable();
            alert('삭제되었습니다.');
        }
    }

    editSelectedAssets() {
        const selectedIds = this.getSelectedIds('taxAssetsTableBody');
        if (selectedIds.length === 0) {
            alert('수정할 항목을 선택해주세요.');
            return;
        }
        if (selectedIds.length > 1) {
            alert('한 번에 하나의 항목만 수정할 수 있습니다.');
            return;
        }
        this.editAsset(selectedIds[0]);
    }

    deleteSelectedAssets() {
        const selectedIds = this.getSelectedIds('taxAssetsTableBody');
        if (selectedIds.length === 0) {
            alert('삭제할 항목을 선택해주세요.');
            return;
        }
        if (confirm(`선택된 ${selectedIds.length}개 항목을 삭제하시겠습니까?`)) {
            selectedIds.forEach(id => {
                this.sampleData.taxAssets = this.sampleData.taxAssets.filter(a => a.id !== id);
            });
            this.renderTaxAssetsTable();
            alert('삭제되었습니다.');
        }
    }

    getSelectedIds(tableBodyId) {
        const tbody = document.getElementById(tableBodyId);
        if (!tbody) return [];
        
        const checkboxes = tbody.querySelectorAll('input[type="checkbox"]:checked');
        return Array.from(checkboxes).map(cb => {
            const row = cb.closest('tr');
            const actionBtn = row.querySelector('.action-btn.edit');
            if (actionBtn && actionBtn.onclick) {
                const onclickStr = actionBtn.onclick.toString();
                const match = onclickStr.match(/app\.(?:edit|delete)(\w+)\((\d+)\)/);
                return match ? parseInt(match[2]) : null;
            }
            return null;
        }).filter(id => id !== null);
    }

    // 이사/감사 등재일 변경 시 임기 만료일 자동 계산
    bindDirectorFormEvents() {
        const appointmentDateInput = document.getElementById('directorAppointmentDate');
        const shareholderMeetingInput = document.getElementById('expectedShareholderMeeting');
        
        const calculateExpiryDate = () => {
            const appointmentDate = appointmentDateInput?.value;
            const shareholderMeetingDate = shareholderMeetingInput?.value;
            
            if (appointmentDate && shareholderMeetingDate) {
                const appointment = new Date(appointmentDate);
                const shareholderMeeting = new Date(shareholderMeetingDate);
                
                // 3년 후 정기 주주총회 전일까지
                const threeYearsLater = new Date(appointment);
                threeYearsLater.setFullYear(threeYearsLater.getFullYear() + 3);
                
                // 3년 후의 예상 정기 주주총회일을 찾기
                const expiryYear = threeYearsLater.getFullYear();
                const expiryShareholderMeeting = new Date(shareholderMeeting);
                expiryShareholderMeeting.setFullYear(expiryYear);
                
                // 주주총회 전일
                const expiryDate = new Date(expiryShareholderMeeting);
                expiryDate.setDate(expiryDate.getDate() - 1);
                
                document.getElementById('directorExpiryDate').value = expiryDate.toISOString().split('T')[0];
            }
        };
        
        if (appointmentDateInput) {
            appointmentDateInput.addEventListener('change', calculateExpiryDate);
        }
        
        if (shareholderMeetingInput) {
            shareholderMeetingInput.addEventListener('change', calculateExpiryDate);
        }
        
        // 히스토리 법인명 선택 시 담당자 자동 채우기
        const historyCorpSelect = document.getElementById('historyCorp');
        if (historyCorpSelect) {
            historyCorpSelect.addEventListener('change', (e) => {
                this.fillManagerFromCorp(e.target.value);
            });
        }
    }
    
    // 히스토리 폼에 법인 목록 채우기
    populateHistoryCorpSelect() {
        const select = document.getElementById('historyCorp');
        if (select) {
            const options = this.sampleData.corporations.map(corp => 
                `<option value="${corp.name}">${corp.name}</option>`
            ).join('');
            select.innerHTML = '<option value="">법인 선택</option>' + options;
        }
    }
    
    // 법인명에서 담당자 자동 채우기
    fillManagerFromCorp(corpName) {
        const corp = this.sampleData.corporations.find(c => c.name === corpName);
        const managerInput = document.getElementById('historyManager');
        if (corp && managerInput) {
            managerInput.value = corp.manager;
        }
    }
    
    // 히스토리에서 법인명 클릭 시 히스토리 폼에 반영
    selectCorpFromHistory(corpName) {
        const corpSelect = document.getElementById('historyCorp');
        const managerInput = document.getElementById('historyManager');
        
        if (corpSelect) {
            corpSelect.value = corpName;
        }
        
        // 담당자도 자동으로 채우기
        this.fillManagerFromCorp(corpName);
    }
    
    // 히스토리 폼 초기화
    clearHistoryForm() {
        document.getElementById('historyDate').value = '';
        document.getElementById('historyCorp').value = '';
        document.getElementById('historyManager').value = '';
        document.getElementById('historyContent').value = '';
    }
    
    // 법인별 알림 보기
    showCorpNotifications(corpId) {
        const corp = this.sampleData.corporations.find(c => c.id === corpId);
        const notifications = this.sampleData.notifications.filter(n => n.corpId === corpId);
        
        if (!corp || notifications.length === 0) {
            alert('해당 법인의 알림이 없습니다.');
            return;
        }
        
        let notificationHtml = `<h3>${corp.name} 알림 목록</h3><div class="notifications-list">`;
        
        notifications.forEach(notification => {
            const typeClass = this.getNotificationTypeClass(notification.type);
            const readStatus = notification.isRead ? '읽음' : '읽지 않음';
            
            notificationHtml += `
                <div class="notification-item ${notification.isRead ? 'read' : 'unread'}">
                    <div class="notification-header">
                        <span class="notification-type ${typeClass}">${this.getNotificationTypeText(notification.type)}</span>
                        <span class="notification-date">${notification.date}</span>
                        <span class="read-status">${readStatus}</span>
                    </div>
                    <h4>${notification.title}</h4>
                    <p>${notification.content}</p>
                </div>
            `;
        });
        
        notificationHtml += '</div>';
        
        // 간단한 모달로 표시 (실제로는 더 정교한 모달을 만들 수 있음)
        const notificationWindow = window.open('', '_blank', 'width=600,height=400,scrollbars=yes');
        notificationWindow.document.write(`
            <html>
                <head>
                    <title>${corp.name} 알림</title>
                    <style>
                        body { font-family: "Noto Sans KR", sans-serif; padding: 20px; line-height: 1.6; }
                        h3 { color: #1F2937; margin-bottom: 20px; }
                        .notification-item { 
                            border: 1px solid #E5E7EB; 
                            border-radius: 8px; 
                            padding: 15px; 
                            margin-bottom: 15px; 
                            background: white;
                        }
                        .notification-item.unread { 
                            border-left: 4px solid #3B82F6; 
                            background: #F8FAFC;
                        }
                        .notification-header { 
                            display: flex; 
                            justify-content: space-between; 
                            align-items: center;
                            margin-bottom: 10px;
                            font-size: 0.875rem;
                        }
                        .notification-type { 
                            padding: 2px 8px; 
                            border-radius: 4px; 
                            font-weight: 500;
                            font-size: 0.75rem;
                        }
                        .type-warning { background: #FEF3C7; color: #92400E; }
                        .type-danger { background: #FEE2E2; color: #991B1B; }
                        .type-success { background: #D1FAE5; color: #065F46; }
                        .type-info { background: #DBEAFE; color: #1E40AF; }
                        .notification-date { color: #6B7280; }
                        .read-status { color: #6B7280; font-size: 0.75rem; }
                        h4 { margin: 0 0 8px 0; color: #374151; }
                        p { margin: 0; color: #6B7280; }
                    </style>
                </head>
                <body>
                    ${notificationHtml}
                </body>
            </html>
        `);
    }
    
    // 알림 타입에 따른 CSS 클래스 반환
    getNotificationTypeClass(type) {
        const typeMap = {
            'warning': 'type-warning',
            'danger': 'type-danger',
            'success': 'type-success',
            'info': 'type-info'
        };
        return typeMap[type] || 'type-info';
    }
    
    // 알림 타입에 따른 텍스트 반환
    getNotificationTypeText(type) {
        const typeMap = {
            'warning': '주의',
            'danger': '긴급',
            'success': '완료',
            'info': '정보'
        };
        return typeMap[type] || '정보';
    }
    
    // 서류명 추가 모달 표시
    showAddDocumentTypeModal() {
        const newDocumentType = prompt('추가할 서류명을 입력하세요:', '');
        if (newDocumentType && newDocumentType.trim()) {
            this.addCustomDocumentType(newDocumentType.trim());
            alert(`'${newDocumentType.trim()}' 서류명이 추가되었습니다.`);
        }
    }
    
    // 커스텀 서류명을 드롭다운에 추가
    addCustomDocumentType(documentType) {
        const select = document.getElementById('documentName');
        if (select) {
            // 이미 존재하는지 확인
            const existingOptions = Array.from(select.options).map(option => option.value);
            if (!existingOptions.includes(documentType)) {
                // 커스텀 서류명 배열에 추가
                this.customDocumentTypes.push(documentType);
                
                // '기타' 옵션 앞에 새 옵션 추가
                const newOption = document.createElement('option');
                newOption.value = documentType;
                newOption.textContent = documentType;
                
                const otherOption = select.querySelector('option[value="기타"]');
                if (otherOption) {
                    select.insertBefore(newOption, otherOption);
                } else {
                    select.appendChild(newOption);
                }
                
                // 새로 추가된 서류명 선택
                select.value = documentType;
                
                // 기타 입력 필드 숨기기
                document.getElementById('customDocumentGroup').style.display = 'none';
                document.getElementById('customDocumentName').required = false;
            }
        }
    }
    
    // 서류명 관리 모달 표시
    showDocumentTypeManageModal() {
        document.getElementById('documentTypeManageModal').classList.add('show');
        this.renderCustomDocumentTypesList();
    }
    
    // 서류명 관리 모달 숨기기
    hideDocumentTypeManageModal() {
        document.getElementById('documentTypeManageModal').classList.remove('show');
    }
    
    // 사용자 정의 서류명 목록 렌더링
    renderCustomDocumentTypesList() {
        const container = document.getElementById('customDocumentTypesList');
        const noCustomTypes = document.getElementById('noCustomTypes');
        
        if (this.customDocumentTypes.length === 0) {
            container.innerHTML = '';
            noCustomTypes.style.display = 'block';
            return;
        }
        
        noCustomTypes.style.display = 'none';
        container.innerHTML = this.customDocumentTypes.map((type, index) => `
            <div class="document-type-item">
                <span class="document-type-name">${type}</span>
                <div class="document-type-actions">
                    <button class="btn btn-outline btn-sm" onclick="app.editDocumentType(${index})">
                        <i class="fas fa-edit"></i>
                        수정
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="app.deleteDocumentType(${index})">
                        <i class="fas fa-trash"></i>
                        삭제
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    // 서류명 수정
    editDocumentType(index) {
        const oldType = this.customDocumentTypes[index];
        const newType = prompt('서류명을 수정하세요:', oldType);
        
        if (newType && newType.trim() && newType.trim() !== oldType) {
            const trimmedNewType = newType.trim();
            
            // 중복 확인 (기존 서류명과 다른 커스텀 서류명)
            const allTypes = [...this.getDefaultDocumentTypes(), ...this.customDocumentTypes.filter((_, i) => i !== index)];
            if (allTypes.includes(trimmedNewType)) {
                alert('이미 존재하는 서류명입니다.');
                return;
            }
            
            // 배열 업데이트
            this.customDocumentTypes[index] = trimmedNewType;
            
            // 드롭다운 업데이트
            this.updateDocumentTypeDropdown();
            
            // 목록 다시 렌더링
            this.renderCustomDocumentTypesList();
            
            alert('서류명이 수정되었습니다.');
        }
    }
    
    // 서류명 삭제
    deleteDocumentType(index) {
        const typeToDelete = this.customDocumentTypes[index];
        
        if (confirm(`'${typeToDelete}' 서류명을 삭제하시겠습니까?`)) {
            // 배열에서 제거
            this.customDocumentTypes.splice(index, 1);
            
            // 드롭다운 업데이트
            this.updateDocumentTypeDropdown();
            
            // 목록 다시 렌더링
            this.renderCustomDocumentTypesList();
            
            alert('서류명이 삭제되었습니다.');
        }
    }
    
    // 기본 서류명 목록 반환
    getDefaultDocumentTypes() {
        return [
            '법인 등기부등본',
            '사업자등록증',
            '정관',
            '주주명부',
            '이사회결의서',
            '주주총회결의서',
            '재무제표'
        ];
    }
    
    // 서류명 드롭다운 업데이트
    updateDocumentTypeDropdown() {
        const select = document.getElementById('documentName');
        if (!select) return;
        
        const currentValue = select.value;
        
        // 기본 옵션들 다시 생성
        const defaultTypes = this.getDefaultDocumentTypes();
        const defaultOptions = ['<option value="">서류 선택</option>'];
        
        defaultTypes.forEach(type => {
            defaultOptions.push(`<option value="${type}">${type}</option>`);
        });
        
        // 커스텀 서류명 추가
        this.customDocumentTypes.forEach(type => {
            defaultOptions.push(`<option value="${type}">${type}</option>`);
        });
        
        // 기타 옵션 추가
        defaultOptions.push('<option value="기타">기타</option>');
        
        select.innerHTML = defaultOptions.join('');
        
        // 이전 선택값 복원 (가능한 경우)
        if (currentValue && [...defaultTypes, ...this.customDocumentTypes, '기타', ''].includes(currentValue)) {
            select.value = currentValue;
        }
    }
    
    // 설정 페이지 초기화
    initializeSettingsPage() {
        this.renderCategoryList();
        this.renderInstitutionList();
        this.renderAssetTypeList(1);
        this.renderAssetTypeList(2);
        this.renderNotificationLogs();
        this.updateSettingsMenuVisibility();
    }
    
    // 설정 메뉴 클릭 처리
    handleSettingsMenuClick(settingsType) {
        // 모든 설정 메뉴 아이템 비활성화
        document.querySelectorAll('.settings-menu-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // 클릭한 메뉴 아이템 활성화
        document.querySelector(`[data-settings="${settingsType}"]`).classList.add('active');
        
        // 모든 설정 섹션 숨기기
        document.querySelectorAll('.settings-section').forEach(section => {
            section.style.display = 'none';
            section.classList.remove('active');
        });
        
        // 해당 설정 섹션 보이기
        const targetSection = document.getElementById(settingsType);
        if (targetSection) {
            targetSection.style.display = 'block';
            targetSection.classList.add('active');
        }
        
        // 각 설정 타입별 초기화
        switch(settingsType) {
            case 'corporate-accounts':
                this.loadCorporateAccountsTable();
                break;
            case 'staff-management':
                this.loadStaffManagementTable();
                break;
            case 'monitoring':
                this.loadMonitoringTable();
                break;
            case 'product-management':
                this.initializeProductManagement();
                break;
            case 'document-management':
                this.loadDocumentTypesTable();
                break;
            case 'profile':
                this.initializeProfileSettings();
                break;
            case 'notifications':
                this.initializeNotificationSettings();
                break;
            case 'company-info':
                this.initializeCompanyInfoSettings();
                break;
        }
    }
    
    // 법인 계정 관리 테이블 로드
    loadCorporateAccountsTable() {
        const tbody = document.getElementById('corporateAccountsTableBody');
        if (!tbody) return;
        
        // 샘플 데이터
        const sampleData = [
            {
                id: 1,
                name: 'ABC 법인',
                ceo: '김대표',
                ceoPhone: '02-1234-5678',
                ceoEmail: 'ceo@abc.com',
                manager: '이담당',
                managerPhone: '010-1234-5678',
                managerEmail: 'manager@abc.com',
                registrationDate: '2024-01-15',
                status: '활성'
            },
            {
                id: 2,
                name: 'XYZ 법인',
                ceo: '박대표',
                ceoPhone: '02-2345-6789',
                ceoEmail: 'ceo@xyz.com',
                manager: '최담당',
                managerPhone: '010-2345-6789',
                managerEmail: 'manager@xyz.com',
                registrationDate: '2024-01-10',
                status: '비활성'
            }
        ];
        
        tbody.innerHTML = sampleData.map(corp => `
            <tr>
                <td><input type="checkbox" class="corporate-checkbox" data-id="${corp.id}"></td>
                <td>${corp.name}</td>
                <td>${corp.ceo}</td>
                <td>${corp.ceoPhone}</td>
                <td>${corp.ceoEmail}</td>
                <td>${corp.manager}</td>
                <td>${corp.managerPhone}</td>
                <td>${corp.managerEmail}</td>
                <td>${corp.registrationDate}</td>
                <td><span class="status-badge ${corp.status === '활성' ? 'active' : 'inactive'}">${corp.status}</span></td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline" onclick="editCorporateAccount(${corp.id})">수정</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteCorporateAccount(${corp.id})">삭제</button>
                </td>
            </tr>
        `).join('');
        
        document.getElementById('totalCorporates').textContent = sampleData.length;
    }
    
    // 담당자 정보 테이블 로드
    loadStaffManagementTable() {
        const tbody = document.getElementById('staffTableBody');
        if (!tbody) return;
        
        // 샘플 데이터
        const sampleData = [
            {
                id: 1,
                type: '내부',
                name: '김관리자',
                position: '팀장',
                phone: '010-1234-5678',
                email: 'admin@company.com',
                userId: 'admin',
                password: '****',
                work: '전체 관리'
            },
            {
                id: 2,
                type: '내부',
                name: '이담당자',
                position: '대리',
                phone: '010-2345-6789',
                email: 'staff@company.com',
                userId: 'staff',
                password: '****',
                work: '자산관리'
            },
            {
                id: 3,
                type: '외부',
                name: '박외부',
                position: '외부담당',
                phone: '010-3456-7890',
                email: 'external@company.com',
                userId: 'external',
                password: '-',
                work: '외부업무'
            }
        ];
        
        tbody.innerHTML = sampleData.map(staff => `
            <tr>
                <td><input type="checkbox" class="staff-checkbox" data-id="${staff.id}"></td>
                <td><span class="type-badge ${staff.type === '내부' ? 'default' : 'custom'}">${staff.type}</span></td>
                <td>${staff.name}</td>
                <td>${staff.position}</td>
                <td>${staff.phone}</td>
                <td>${staff.email}</td>
                <td>${staff.userId}</td>
                <td>${staff.password}</td>
                <td>${staff.work}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline" onclick="editStaff(${staff.id})">수정</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteStaff(${staff.id})">삭제</button>
                </td>
            </tr>
        `).join('');
    }
    
    // 모니터링 테이블 로드
    loadMonitoringTable() {
        const tbody = document.getElementById('monitoringTableBody');
        if (!tbody) return;
        
        // 샘플 데이터
        const sampleData = [
            {
                datetime: '2024-01-20 14:30:25',
                corpName: 'ABC 법인',
                worker: '이담당',
                action: '이사 정보 수정',
                ip: '192.168.1.100'
            },
            {
                datetime: '2024-01-20 13:45:12',
                corpName: 'XYZ 법인',
                worker: '최담당',
                action: '서류 업로드',
                ip: '192.168.1.101'
            },
            {
                datetime: '2024-01-20 12:15:33',
                corpName: 'ABC 법인',
                worker: '이담당',
                action: '자산 정보 등록',
                ip: '192.168.1.100'
            }
        ];
        
        tbody.innerHTML = sampleData.map(log => `
            <tr>
                <td>${log.datetime}</td>
                <td>${log.corpName}</td>
                <td>${log.worker}</td>
                <td>${log.action}</td>
                <td>${log.ip}</td>
            </tr>
        `).join('');
    }
    
    // 서류명 관리 테이블 로드
    loadDocumentTypesTable() {
        const tbody = document.getElementById('documentTypesTableBody');
        if (!tbody) return;
        
        // 샘플 데이터
        const sampleData = [
            { id: 1, name: '법인 등기부등본', type: '기본' },
            { id: 2, name: '사업자등록증', type: '기본' },
            { id: 3, name: '정관', type: '기본' },
            { id: 4, name: '주주명부', type: '기본' },
            { id: 5, name: '이사회결의서', type: '기본' },
            { id: 6, name: '재무제표', type: '기본' },
            { id: 7, name: '계약서', type: '사용자 정의' },
            { id: 8, name: '보고서', type: '사용자 정의' }
        ];
        
        tbody.innerHTML = sampleData.map(doc => `
            <tr>
                <td><input type="checkbox" class="document-type-checkbox" data-id="${doc.id}"></td>
                <td>${doc.name}</td>
                <td><span class="type-badge ${doc.type === '기본' ? 'default' : 'custom'}">${doc.type}</span></td>
                <td class="text-center">
                    ${doc.type === '사용자 정의' ? `
                        <button class="btn btn-sm btn-outline" onclick="editDocumentType(${doc.id})">수정</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteDocumentType(${doc.id})">삭제</button>
                    ` : '<span class="text-muted">수정 불가</span>'}
                </td>
            </tr>
        `).join('');
    }
    
    // 프로필 설정 초기화
    initializeProfileSettings() {
        // 프로필 수정 버튼 이벤트
        const editBtn = document.getElementById('editProfileBtn');
        const saveBtn = document.getElementById('saveProfileBtn');
        const cancelBtn = document.getElementById('cancelProfileBtn');
        
        if (editBtn) {
            editBtn.addEventListener('click', () => {
                // 입력 필드 활성화
                document.getElementById('profileName').readOnly = false;
                document.getElementById('profilePhone').readOnly = false;
                document.getElementById('profileDept').readOnly = false;
                
                editBtn.style.display = 'none';
                saveBtn.style.display = 'inline-block';
                cancelBtn.style.display = 'inline-block';
            });
        }
        
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                // 원래 값으로 복원
                document.getElementById('profileName').value = '김관리자';
                document.getElementById('profilePhone').value = '010-1234-5678';
                document.getElementById('profileDept').value = '관리팀';
                
                // 입력 필드 비활성화
                document.getElementById('profileName').readOnly = true;
                document.getElementById('profilePhone').readOnly = true;
                document.getElementById('profileDept').readOnly = true;
                
                editBtn.style.display = 'inline-block';
                saveBtn.style.display = 'none';
                cancelBtn.style.display = 'none';
            });
        }
    }
    
    // 알림 설정 초기화
    initializeNotificationSettings() {
        // 알림 설정 토글 이벤트들
        const notificationCheckboxes = document.querySelectorAll('#notifications input[type="checkbox"]');
        notificationCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                console.log(`${e.target.id} 알림 설정 변경:`, e.target.checked);
            });
        });
    }
    
    // 회사 정보 설정 초기화
    initializeCompanyInfoSettings() {
        // 로고 업로드 이벤트
        const selectLogoBtn = document.getElementById('selectLogoBtn');
        const logoUpload = document.getElementById('logoUpload');
        const removeLogoBtn = document.getElementById('removeLogoBtn');
        const logoImage = document.getElementById('logoImage');
        const logoPreview = document.getElementById('logoPreview');
        
        if (selectLogoBtn && logoUpload) {
            selectLogoBtn.addEventListener('click', () => {
                logoUpload.click();
            });
        }
        
        if (logoUpload) {
            logoUpload.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        logoImage.src = e.target.result;
                        logoImage.style.display = 'block';
                        logoPreview.querySelector('.logo-placeholder').style.display = 'none';
                        removeLogoBtn.style.display = 'inline-block';
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
        
        if (removeLogoBtn) {
            removeLogoBtn.addEventListener('click', () => {
                logoImage.src = '';
                logoImage.style.display = 'none';
                logoPreview.querySelector('.logo-placeholder').style.display = 'block';
                removeLogoBtn.style.display = 'none';
                logoUpload.value = '';
            });
        }
    }
    
    // 상품 관리 초기화
    initializeProductManagement() {
        // 상품 관리 네비게이션 이벤트
        const navBtns = document.querySelectorAll('.product-navigation .nav-btn');
        navBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                this.switchProductSection(section);
            });
        });
        
        // 옵션 탭 이벤트
        const tabBtns = document.querySelectorAll('.option-tabs .tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.currentTarget.dataset.tab;
                this.switchOptionTab(tab);
            });
        });
        
        // 모달 이벤트 바인딩
        this.bindProductModalEvents();
        
        // localStorage에서 데이터 로드
        loadProductOptionsFromStorage();
        loadProductsFromStorage();
        
        // 초기 데이터 로드
        this.loadProductOptions();
        this.loadProducts();
        this.loadDropdownOptions();
        
        // 모든 탭의 테이블 업데이트
        ['categories', 'institutions', 'assetTypes1', 'assetTypes2', 'paymentCycles'].forEach(tab => {
            updateOptionTable(tab);
        });
    }
    
    // 상품 모달 이벤트 바인딩
    bindProductModalEvents() {
        // 옵션 추가 모달
        const addOptionModal = document.getElementById('addOptionModal');
        const cancelOptionBtn = document.getElementById('cancelOptionBtn');
        const saveOptionBtn = document.getElementById('saveOptionBtn');
        
        if (cancelOptionBtn) {
            cancelOptionBtn.addEventListener('click', () => {
                addOptionModal.style.display = 'none';
                document.getElementById('addOptionForm').reset();
                
                // 수정 모드 플래그 초기화
                addOptionModal.dataset.editMode = 'false';
                addOptionModal.dataset.editTab = '';
                addOptionModal.dataset.editId = '';
            });
        }
        
        if (saveOptionBtn) {
            saveOptionBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.saveOption();
            });
        }
        
        // 상품 추가 모달
        const addProductModal = document.getElementById('addProductModal');
        const cancelProductBtn = document.getElementById('cancelProductBtn');
        const saveProductBtn = document.getElementById('saveProductBtn');
        
        // 모달 닫기 이벤트 (X 버튼)
        const closeBtn = addProductModal.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                addProductModal.classList.remove('show');
                addProductModal.style.display = 'none';
                document.getElementById('addProductForm').reset();
            });
        }
        
        // 모달 외부 클릭 시 닫기
        addProductModal.addEventListener('click', (e) => {
            if (e.target === addProductModal) {
                addProductModal.classList.remove('show');
                addProductModal.style.display = 'none';
                document.getElementById('addProductForm').reset();
            }
        });
        
        if (cancelProductBtn) {
            cancelProductBtn.addEventListener('click', (e) => {
                e.preventDefault();
                addProductModal.classList.remove('show');
                addProductModal.style.display = 'none';
                document.getElementById('addProductForm').reset();
            });
        }
        
        if (saveProductBtn) {
            saveProductBtn.addEventListener('click', (e) => {
                e.preventDefault();
                saveProduct();
            });
        }
        
        // 자산구분(1) 변경 시 자산구분(2) 업데이트
        const assetType1Select = document.getElementById('productAssetType1');
        if (assetType1Select) {
            assetType1Select.addEventListener('change', (e) => {
                this.updateAssetType2Options(e.target.value);
            });
        }
        
        // 모달 닫기 이벤트
        document.querySelectorAll('.modal .close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                modal.style.display = 'none';
                
                // 옵션 모달인 경우 수정 모드 플래그 초기화
                if (modal.id === 'addOptionModal') {
                    modal.dataset.editMode = 'false';
                    modal.dataset.editTab = '';
                    modal.dataset.editId = '';
                    document.getElementById('addOptionForm').reset();
                }
            });
        });
    }
    
    // 상품 관리 섹션 전환
    switchProductSection(section) {
        // 네비게이션 버튼 상태 변경
        document.querySelectorAll('.product-navigation .nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-section="${section}"]`).classList.add('active');
        
        // 섹션 표시/숨김
        document.querySelectorAll('.product-section').forEach(sec => {
            sec.classList.remove('active');
        });
        document.getElementById(`${section}Section`).classList.add('active');
    }
    
    // 옵션 탭 전환
    switchOptionTab(tab) {
        // 탭 버튼 상태 변경
        document.querySelectorAll('.option-tabs .tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
        
        // 탭 콘텐츠 표시/숨김
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tab}-tab`).classList.add('active');
        
        // localStorage에서 데이터 로드 후 테이블 렌더링
        loadProductOptionsFromStorage();
        updateOptionTable(tab);
    }
    
    // 상품 옵션 로드
    loadProductOptions() {
        // 카테고리 로드
        this.loadCategories();
        // 거래기관 로드
        this.loadInstitutions();
        // 자산구분 로드
        this.loadAssetTypes(1);
        this.loadAssetTypes(2);
        // 납입주기 로드
        this.loadPaymentCycles();
        
        // 현재 활성 탭의 데이터 렌더링
        const activeTab = document.querySelector('.tab-btn.active');
        if (activeTab) {
            const tabName = activeTab.dataset.tab;
            this.renderOptionTable(tabName);
        }
    }
    
    // 카테고리 로드
    loadCategories() {
        const tbody = document.getElementById('categoriesTableBody');
        if (!tbody) return;
        
        const categories = ['절세자산', '투자자산', '부동산자산', '기타자산'];
        
        tbody.innerHTML = categories.map((category, index) => `
            <tr>
                <td>${category}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline" onclick="editCategory(${index})">수정</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteCategory(${index})">삭제</button>
                </td>
            </tr>
        `).join('');
    }
    
    // 거래기관 로드
    loadInstitutions() {
        const tbody = document.getElementById('institutionsTableBody');
        if (!tbody) return;
        
        const institutions = ['삼성증권', 'KB증권', 'NH투자증권', '키움증권', '한국투자증권'];
        
        tbody.innerHTML = institutions.map((institution, index) => `
            <tr>
                <td>${institution}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline" onclick="editInstitution(${index})">수정</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteInstitution(${index})">삭제</button>
                </td>
            </tr>
        `).join('');
    }
    
    // 자산구분 로드
    loadAssetTypes(type) {
        const tbody = document.getElementById(`assetTypes${type}TableBody`);
        if (!tbody) return;
        
        const assetTypes = type === 1 
            ? ['절세자산', '투자자산', '부동산자산', '기타자산']
            : ['연금저축', 'IRP', 'ISA', '펀드', '주식', '채권'];
        
        tbody.innerHTML = assetTypes.map((assetType, index) => `
            <tr>
                <td>${assetType}</td>
                <td>${type === 1 ? '연결된 자산구분(2) 목록' : '절세자산'}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline" onclick="editAssetType(${type}, ${index})">수정</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteAssetType(${type}, ${index})">삭제</button>
                </td>
            </tr>
        `).join('');
    }
    
    // 납입주기 로드
    loadPaymentCycles() {
        const tbody = document.getElementById('paymentCycleTableBody');
        if (!tbody) return;
        
        const cycles = ['월납', '분기납', '반년납', '연납', '일시납'];
        
        tbody.innerHTML = cycles.map((cycle, index) => `
            <tr>
                <td>${cycle}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline" onclick="editPaymentCycle(${index})">수정</button>
                    <button class="btn btn-sm btn-danger" onclick="deletePaymentCycle(${index})">삭제</button>
                </td>
            </tr>
        `).join('');
    }
    
    // 상품 목록 로드
    loadProducts() {
        const tbody = document.getElementById('productsTableBody');
        if (!tbody) return;
        
        // localStorage에서 상품 데이터 로드
        loadProductsFromStorage();
        
        const products = window.products || [];
        
        if (products.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" class="empty-state">등록된 상품이 없습니다.</td></tr>';
        } else {
            tbody.innerHTML = products.map(product => `
                <tr>
                    <td><input type="checkbox" class="product-checkbox" data-id="${product.id}"></td>
                    <td>${product.name}</td>
                    <td>${product.category}</td>
                    <td>${product.institution}</td>
                    <td>${product.assetType1}</td>
                    <td>${product.assetType2}</td>
                    <td>${product.paymentCycle}</td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-outline" onclick="editProduct(${product.id})">수정</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteProduct(${product.id})">삭제</button>
                    </td>
                </tr>
            `).join('');
        }
    }
    
    // 옵션 저장
    saveOption() {
        console.log('saveOption 호출됨');
        
        const optionName = document.getElementById('optionName').value.trim();
        const currentTab = document.querySelector('.tab-btn.active').dataset.tab;
        
        console.log('옵션명:', optionName);
        console.log('현재 탭:', currentTab);
        
        if (!optionName) {
            alert('옵션명을 입력해주세요.');
            return;
        }
        
        // 자산구분(2)인 경우 상위 선택 확인
        if (currentTab === 'assetTypes2') {
            const parentId = document.getElementById('parentAssetType').value;
            if (!parentId) {
                alert('상위 자산구분(1)을 선택해주세요.');
                return;
            }
        }
        
        // 옵션 데이터에 추가
        const optionData = {
            id: Date.now(),
            name: optionName,
            parentId: currentTab === 'assetTypes2' ? document.getElementById('parentAssetType').value : null
        };
        
        console.log('옵션 데이터:', optionData);
        
        // 해당 탭의 데이터에 추가
        this.addOptionToData(currentTab, optionData);
        
        // 테이블 새로고침
        this.loadProductOptions();
        
        // 모달 닫기
        document.getElementById('addOptionModal').style.display = 'none';
        document.getElementById('addOptionForm').reset();
        
        alert('옵션이 추가되었습니다.');
    }
    
    // 옵션 데이터에 추가
    addOptionToData(tab, optionData) {
        if (!this.productOptions) {
            this.productOptions = {
                categories: [],
                institutions: [],
                assetTypes1: [],
                assetTypes2: [],
                paymentCycles: []
            };
        }
        
        this.productOptions[tab].push(optionData);
    }
    
    // 옵션 테이블 렌더링
    renderOptionTable(tabName) {
        const tbody = document.getElementById(`${tabName}TableBody`);
        if (!tbody) return;
        
        const options = this.productOptions?.[tabName] || [];
        
        if (options.length === 0) {
            tbody.innerHTML = '<tr><td colspan="3" class="empty-state">등록된 옵션이 없습니다.</td></tr>';
            return;
        }
        
        tbody.innerHTML = options.map(option => `
            <tr>
                <td>${option.name}</td>
                <td>${option.parentId ? this.getParentName(option.parentId) : '-'}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline" onclick="editOption('${tabName}', ${option.id})">수정</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteOption('${tabName}', ${option.id})">삭제</button>
                </td>
            </tr>
        `).join('');
    }
    
    // 상위 옵션명 가져오기
    getParentName(parentId) {
        const parentOptions = this.productOptions?.assetTypes1 || [];
        const parent = parentOptions.find(option => option.id == parentId);
        return parent ? parent.name : '-';
    }
    
    // 상품 저장
    saveProduct() {
        const form = document.getElementById('addProductForm');
        
        // 옵션명으로 실제 이름 가져오기
        const categoryName = getOptionNameById('productCategory', 'categories');
        const institutionName = getOptionNameById('productInstitution', 'institutions');
        const assetType1Name = getOptionNameById('productAssetType1', 'assetTypes1');
        const assetType2Name = getOptionNameById('productAssetType2', 'assetTypes2');
        const paymentCycleName = getOptionNameById('productPaymentCycle', 'paymentCycles');
        
        const productData = {
            id: Date.now(),
            name: document.getElementById('productName').value.trim(),
            category: categoryName,
            institution: institutionName,
            assetType1: assetType1Name,
            assetType2: assetType2Name,
            paymentCycle: paymentCycleName
        };
        
        // 유효성 검사
        if (!productData.name || !productData.category || !productData.institution || 
            !productData.assetType1 || !productData.assetType2 || !productData.paymentCycle) {
            alert('모든 필수 항목을 입력해주세요.');
            return;
        }
        
        // localStorage에서 상품 데이터 로드
        loadProductsFromStorage();
        
        // 상품 데이터에 추가
        window.products.push(productData);
        
        // localStorage에 저장
        saveProductsToStorage();
        
        // 테이블 새로고침
        this.loadProducts();
        
        // 모달 닫기
        const addProductModal = document.getElementById('addProductModal');
        addProductModal.classList.remove('show');
        addProductModal.style.display = 'none';
        form.reset();
        
        alert('상품이 추가되었습니다.');
    }
    
    // 자산구분(2) 옵션 업데이트
    updateAssetType2Options(assetType1Id) {
        const assetType2Select = document.getElementById('productAssetType2');
        if (!assetType2Select) return;
        
        // 자산구분(2) 옵션 초기화
        assetType2Select.innerHTML = '<option value="">선택하세요</option>';
        
        if (assetType1Id) {
            // localStorage에서 데이터 로드
            loadProductOptionsFromStorage();
            
            // 해당 자산구분(1)에 연결된 자산구분(2) 옵션들 로드
            const assetType2Options = window.productOptions?.assetTypes2?.filter(option => 
                option.parentId == assetType1Id
            ) || [];
            
            // 이름순으로 정렬
            const sortedOptions = assetType2Options.sort((a, b) => a.name.localeCompare(b.name));
            
            sortedOptions.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.id;
                optionElement.textContent = option.name;
                assetType2Select.appendChild(optionElement);
            });
        }
    }
    
    // 드롭다운 옵션 로드
    loadDropdownOptions() {
        // localStorage에서 최신 데이터 로드
        loadProductOptionsFromStorage();
        
        // 카테고리 옵션
        this.loadDropdownOption('productCategory', 'categories');
        // 거래기관 옵션
        this.loadDropdownOption('productInstitution', 'institutions');
        // 자산구분(1) 옵션
        this.loadDropdownOption('productAssetType1', 'assetTypes1');
        // 납입주기 옵션은 populateProductFormOptions에서 처리하므로 제외
        // this.loadDropdownOption('productPaymentCycle', 'paymentCycles');
    }
    
    // 드롭다운 옵션 로드 헬퍼
    loadDropdownOption(selectId, dataKey) {
        const select = document.getElementById(selectId);
        if (!select) return;
        
        select.innerHTML = '<option value="">선택하세요</option>';
        
        // localStorage에서 최신 데이터 로드
        loadProductOptionsFromStorage();
        
        const options = window.productOptions?.[dataKey] || [];
        
        if (dataKey === 'assetTypes2') {
            // 자산구분(2)의 경우 계층적으로 표시
            const sortedOptions = getHierarchicalOptions(options);
            sortedOptions.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.id;
                optionElement.textContent = option.name;
                select.appendChild(optionElement);
            });
        } else {
            // 다른 옵션들은 ID를 값으로 사용
            options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.id;
                optionElement.textContent = option.name;
                select.appendChild(optionElement);
            });
        }
    }
    
    // 카테고리 목록 렌더링
    renderCategoryList() {
        const container = document.getElementById('categoryList');
        if (!container) return;
        
        if (this.settingsData.categories.length === 0) {
            container.innerHTML = '<div class="empty-state">등록된 카테고리가 없습니다.</div>';
            return;
        }
        
        container.innerHTML = this.settingsData.categories.map(category => `
            <div class="list-item">
                <div>
                    <div class="list-item-name">${category.name}</div>
                    <div class="list-item-description" style="font-size: 0.875rem; color: #6B7280;">${category.description}</div>
                </div>
                <div class="list-item-actions">
                    <button class="btn btn-outline btn-sm" onclick="app.editCategory(${category.id})">
                        <i class="fas fa-edit"></i>
                        수정
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="app.deleteCategory(${category.id})">
                        <i class="fas fa-trash"></i>
                        삭제
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    // 거래기관 목록 렌더링
    renderInstitutionList() {
        const container = document.getElementById('institutionList');
        if (!container) return;
        
        if (this.settingsData.institutions.length === 0) {
            container.innerHTML = '<div class="empty-state">등록된 거래기관이 없습니다.</div>';
            return;
        }
        
        container.innerHTML = this.settingsData.institutions.map(institution => `
            <div class="list-item">
                <div>
                    <div class="list-item-name">${institution.name}</div>
                    <div class="list-item-description" style="font-size: 0.875rem; color: #6B7280;">${institution.type} | ${institution.contact}</div>
                </div>
                <div class="list-item-actions">
                    <button class="btn btn-outline btn-sm" onclick="app.editInstitution(${institution.id})">
                        <i class="fas fa-edit"></i>
                        수정
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="app.deleteInstitution(${institution.id})">
                        <i class="fas fa-trash"></i>
                        삭제
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    // 자산구분 목록 렌더링
    renderAssetTypeList(type) {
        const container = document.getElementById(`assetType${type}List`);
        if (!container) return;
        
        const assetTypes = this.settingsData[`assetTypes${type}`];
        
        if (assetTypes.length === 0) {
            container.innerHTML = '<div class="empty-state">등록된 자산구분이 없습니다.</div>';
            return;
        }
        
        container.innerHTML = assetTypes.map(assetType => `
            <div class="list-item">
                <div class="list-item-name">${assetType.name}</div>
                <div class="list-item-actions">
                    <button class="btn btn-outline btn-sm" onclick="app.editAssetType(${type}, ${assetType.id})">
                        <i class="fas fa-edit"></i>
                        수정
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="app.deleteAssetType(${type}, ${assetType.id})">
                        <i class="fas fa-trash"></i>
                        삭제
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    // 카테고리 추가
    addCategory() {
        const name = prompt('카테고리명을 입력하세요:');
        if (!name || !name.trim()) return;
        
        const description = prompt('카테고리 설명을 입력하세요:');
        if (description === null) return;
        
        const newCategory = {
            id: Math.max(...this.settingsData.categories.map(c => c.id), 0) + 1,
            name: name.trim(),
            description: description.trim() || ''
        };
        
        this.settingsData.categories.push(newCategory);
        this.renderCategoryList();
        alert('카테고리가 추가되었습니다.');
    }
    
    // 카테고리 수정
    editCategory(id) {
        const category = this.settingsData.categories.find(c => c.id === id);
        if (!category) return;
        
        const newName = prompt('카테고리명을 수정하세요:', category.name);
        if (newName === null || !newName.trim()) return;
        
        const newDescription = prompt('카테고리 설명을 수정하세요:', category.description);
        if (newDescription === null) return;
        
        category.name = newName.trim();
        category.description = newDescription.trim();
        
        this.renderCategoryList();
        alert('카테고리가 수정되었습니다.');
    }
    
    // 카테고리 삭제
    deleteCategory(id) {
        const category = this.settingsData.categories.find(c => c.id === id);
        if (!category) return;
        
        if (confirm(`'${category.name}' 카테고리를 삭제하시겠습니까?`)) {
            this.settingsData.categories = this.settingsData.categories.filter(c => c.id !== id);
            this.renderCategoryList();
            alert('카테고리가 삭제되었습니다.');
        }
    }
    
    // 거래기관 추가
    addInstitution() {
        const name = prompt('거래기관명을 입력하세요:');
        if (!name || !name.trim()) return;
        
        const type = prompt('기관 유형을 입력하세요 (은행/증권/보험):');
        if (!type || !type.trim()) return;
        
        const contact = prompt('연락처를 입력하세요:');
        if (!contact || !contact.trim()) return;
        
        const newInstitution = {
            id: Math.max(...this.settingsData.institutions.map(i => i.id), 0) + 1,
            name: name.trim(),
            type: type.trim(),
            contact: contact.trim()
        };
        
        this.settingsData.institutions.push(newInstitution);
        this.renderInstitutionList();
        alert('거래기관이 추가되었습니다.');
    }
    
    // 거래기관 수정
    editInstitution(id) {
        const institution = this.settingsData.institutions.find(i => i.id === id);
        if (!institution) return;
        
        const newName = prompt('거래기관명을 수정하세요:', institution.name);
        if (newName === null || !newName.trim()) return;
        
        const newType = prompt('기관 유형을 수정하세요:', institution.type);
        if (newType === null || !newType.trim()) return;
        
        const newContact = prompt('연락처를 수정하세요:', institution.contact);
        if (newContact === null || !newContact.trim()) return;
        
        institution.name = newName.trim();
        institution.type = newType.trim();
        institution.contact = newContact.trim();
        
        this.renderInstitutionList();
        alert('거래기관이 수정되었습니다.');
    }
    
    // 거래기관 삭제
    deleteInstitution(id) {
        const institution = this.settingsData.institutions.find(i => i.id === id);
        if (!institution) return;
        
        if (confirm(`'${institution.name}' 거래기관을 삭제하시겠습니까?`)) {
            this.settingsData.institutions = this.settingsData.institutions.filter(i => i.id !== id);
            this.renderInstitutionList();
            alert('거래기관이 삭제되었습니다.');
        }
    }
    
    // 자산구분 추가
    addAssetType(type) {
        const name = prompt(`자산구분(${type}) 항목을 입력하세요:`);
        if (!name || !name.trim()) return;
        
        const assetTypes = this.settingsData[`assetTypes${type}`];
        const newAssetType = {
            id: Math.max(...assetTypes.map(a => a.id), 0) + 1,
            name: name.trim()
        };
        
        assetTypes.push(newAssetType);
        this.renderAssetTypeList(type);
        alert(`자산구분(${type}) 항목이 추가되었습니다.`);
    }
    
    // 자산구분 수정
    editAssetType(type, id) {
        const assetTypes = this.settingsData[`assetTypes${type}`];
        const assetType = assetTypes.find(a => a.id === id);
        if (!assetType) return;
        
        const newName = prompt(`자산구분(${type}) 항목을 수정하세요:`, assetType.name);
        if (newName === null || !newName.trim()) return;
        
        assetType.name = newName.trim();
        this.renderAssetTypeList(type);
        alert(`자산구분(${type}) 항목이 수정되었습니다.`);
    }
    
    // 자산구분 삭제
    deleteAssetType(type, id) {
        const assetTypes = this.settingsData[`assetTypes${type}`];
        const assetType = assetTypes.find(a => a.id === id);
        if (!assetType) return;
        
        if (confirm(`'${assetType.name}' 항목을 삭제하시겠습니까?`)) {
            this.settingsData[`assetTypes${type}`] = assetTypes.filter(a => a.id !== id);
            this.renderAssetTypeList(type);
            alert(`자산구분(${type}) 항목이 삭제되었습니다.`);
        }
    }
    
    // 백업 생성
    createBackup() {
        const backupData = {
            timestamp: new Date().toISOString(),
            sampleData: this.sampleData,
            settingsData: this.settingsData,
            customDocumentTypes: this.customDocumentTypes
        };
        
        const dataStr = JSON.stringify(backupData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `backup_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        alert('백업 파일이 다운로드되었습니다.');
    }
    
    // 백업 복원
    restoreBackup() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const backupData = JSON.parse(e.target.result);
                    
                    if (confirm('백업을 복원하시겠습니까? 현재 데이터가 모두 교체됩니다.')) {
                        this.sampleData = backupData.sampleData || this.sampleData;
                        this.settingsData = backupData.settingsData || this.settingsData;
                        this.customDocumentTypes = backupData.customDocumentTypes || this.customDocumentTypes;
                        
                        // 데이터 새로고침
                        this.loadSampleData();
                        this.initializeSettingsPage();
                        
                        alert('백업이 복원되었습니다.');
                    }
                } catch (error) {
                    alert('백업 파일이 올바르지 않습니다.');
                }
            };
            reader.readAsText(file);
        };
        
        input.click();
    }
    
    // 설정 메뉴 가시성 업데이트
    updateSettingsMenuVisibility() {
        // body에 사용자 권한 클래스 추가
        document.body.classList.remove('user-admin', 'user-corporate');
        
        if (this.isAdmin) {
            document.body.classList.add('user-admin');
            // 첫 번째 관리사 전용 메뉴를 기본 활성화
            const firstAdminItem = document.querySelector('.settings-menu-item.admin-only');
            if (firstAdminItem) {
                document.querySelectorAll('.settings-menu-item').forEach(item => item.classList.remove('active'));
                firstAdminItem.classList.add('active');
                this.handleSettingsMenuClick(firstAdminItem.dataset.settings);
            }
        } else {
            document.body.classList.add('user-corporate');
            // 첫 번째 법인 전용 메뉴를 기본 활성화
            const firstCorporateItem = document.querySelector('.settings-menu-item.corporate-only');
            if (firstCorporateItem) {
                document.querySelectorAll('.settings-menu-item').forEach(item => item.classList.remove('active'));
                firstCorporateItem.classList.add('active');
                this.handleSettingsMenuClick(firstCorporateItem.dataset.settings);
            } else {
                // 법인 전용 메뉴가 없으면 프로필을 기본으로
                const profileItem = document.querySelector('[data-settings="profile"]');
                if (profileItem) {
                    document.querySelectorAll('.settings-menu-item').forEach(item => item.classList.remove('active'));
                    profileItem.classList.add('active');
                    this.handleSettingsMenuClick('profile');
                }
            }
        }
        
        // 시스템 알림 마스터 스위치 이벤트 바인딩
        this.bindSystemNotificationEvents();
    }
    
    // 알림 발송 기록 렌더링 (관리사 전용)
    renderNotificationLogs() {
        const tbody = document.querySelector('#notificationLogTable tbody');
        if (!tbody) return;
        
        // 필터링 조건 수집
        const typeFilter = document.getElementById('notificationLogFilter')?.value || '';
        const dateFilter = document.getElementById('notificationDateFilter')?.value || '';
        const corporateFilter = document.getElementById('notificationCorporateFilter')?.value.toLowerCase() || '';
        
        let filteredLogs = [...this.notificationLogs];
        
        // 알림 유형 필터
        if (typeFilter) {
            filteredLogs = filteredLogs.filter(log => log.type === typeFilter);
        }
        
        // 날짜 필터
        if (dateFilter) {
            filteredLogs = filteredLogs.filter(log => log.date === dateFilter);
        }
        
        // 법인명 필터 (대상에서 법인명 추출)
        if (corporateFilter) {
            filteredLogs = filteredLogs.filter(log => {
                const corporate = log.target.match(/\((.*?)\)/);
                return corporate && corporate[1].toLowerCase().includes(corporateFilter);
            });
        }
        
        // 관리사 전용 테이블 형식으로 렌더링
        tbody.innerHTML = filteredLogs.map(log => {
            const corporate = log.target.match(/\((.*?)\)/);
            const corporateName = corporate ? corporate[1] : '알 수 없음';
            
            return `
                <tr>
                    <td>${log.date}</td>
                    <td>${log.time}</td>
                    <td>${corporateName}</td>
                    <td style="max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${log.content}">
                        ${log.content}
                    </td>
                </tr>
            `;
        }).join('');
        
        // 필터 이벤트 바인딩
        this.bindNotificationFilterEvents();
    }
    
    // 알림 필터 이벤트 바인딩
    bindNotificationFilterEvents() {
        const filterSelect = document.getElementById('notificationLogFilter');
        const dateFilter = document.getElementById('notificationDateFilter');
        const corporateFilter = document.getElementById('notificationCorporateFilter');
        
        if (filterSelect) {
            filterSelect.onchange = () => this.renderNotificationLogs();
        }
        
        if (dateFilter) {
            dateFilter.onchange = () => this.renderNotificationLogs();
        }
        
        if (corporateFilter) {
            corporateFilter.oninput = () => {
                clearTimeout(this.searchTimeout);
                this.searchTimeout = setTimeout(() => this.renderNotificationLogs(), 300);
            };
        }
    }
    
    // 시스템 알림 이벤트 바인딩
    bindSystemNotificationEvents() {
        const masterSwitch = document.getElementById('systemNotificationMaster');
        if (masterSwitch) {
            masterSwitch.onchange = (e) => this.toggleSystemNotification(e.target.checked);
        }
    }
    
    // 상품 관리 초기화 (상품관리 메뉴 클릭시에만 실행)
    initializeProductManagement() {
        // 상품관리 전용 이벤트 바인딩
        this.bindProductManagementEvents();
        
        // 기본 섹션 활성화
        setTimeout(() => {
            handleProductSectionClick('options');
        }, 50);
    }
    
    // 상품관리 상태 초기화 (다른 메뉴로 이동할 때)
    resetProductManagementState() {
        // 상품관리 네비게이션 상태 초기화
        document.querySelectorAll('#product-management .nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.querySelectorAll('#product-management .product-section').forEach(content => {
            content.classList.remove('active');
        });
        
        // 상품 옵션 탭 상태 초기화
        document.querySelectorAll('#product-management .tab-btn').forEach(tab => {
            tab.classList.remove('active');
        });
        
        document.querySelectorAll('#product-management .tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // 모달 닫기
        document.getElementById('addOptionModal').style.display = 'none';
        const addProductModal = document.getElementById('addProductModal');
        addProductModal.classList.remove('show');
        addProductModal.style.display = 'none';
    }
    
    // 상품 관리 이벤트 바인딩
    bindProductManagementEvents() {
        // 이미 바인딩되어 있으면 중복 실행 방지
        if (this.productEventsbound) return;
        this.productEventsbound = true;
        
        // 네비게이션 버튼 클릭 (상품관리 섹션 내에서만)
        document.querySelectorAll('#product-management .nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.target.dataset.section || e.target.closest('.nav-btn').dataset.section;
                if (section) {
                    handleProductSectionClick(section);
                }
            });
        });
        
        // 상품 옵션 탭 클릭 (상품관리 섹션 내에서만)
        document.querySelectorAll('#product-management .tab-btn').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab || e.target.closest('.tab-btn').dataset.tab;
                if (tabName) {
                    handleProductTabClick(tabName);
                }
            });
        });
        
        // 중복 이벤트 리스너 제거됨 - bindProductModalEvents에서 처리
        
        // 모달 닫기 버튼 (X)
        document.querySelectorAll('#addOptionModal .close, #addProductModal .close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                e.target.closest('.modal').style.display = 'none';
            });
        });
        
        // 모달 외부 클릭 시 닫기
        document.getElementById('addOptionModal')?.addEventListener('click', (e) => {
            if (e.target.id === 'addOptionModal') {
                e.target.style.display = 'none';
            }
        });
        
        document.getElementById('addProductModal')?.addEventListener('click', (e) => {
            if (e.target.id === 'addProductModal') {
                e.target.style.display = 'none';
            }
        });
    }
    
    // 시스템 전체 알림 토글
    toggleSystemNotification(isEnabled) {
        const statusElement = document.getElementById('systemNotificationStatus');
        const statusIcon = statusElement.querySelector('i');
        const statusText = statusElement.querySelector('span');
        
        if (isEnabled) {
            statusElement.className = 'notification-status';
            statusIcon.className = 'fas fa-check-circle';
            statusIcon.style.color = '#10B981';
            statusText.textContent = '시스템 알림이 정상적으로 작동 중입니다.';
        } else {
            statusElement.className = 'notification-status inactive';
            statusIcon.className = 'fas fa-exclamation-triangle';
            statusIcon.style.color = '#EF4444';
            statusText.textContent = '시스템 알림이 비활성화되었습니다. 모든 자동 알림이 중단됩니다.';
        }
        
        // 개별 알림 설정 비활성화/활성화
        const notificationCheckboxes = document.querySelectorAll('.notification-methods input[type="checkbox"]');
        notificationCheckboxes.forEach(checkbox => {
            checkbox.disabled = !isEnabled;
            if (!isEnabled) {
                checkbox.parentElement.style.opacity = '0.5';
            } else {
                checkbox.parentElement.style.opacity = '1';
            }
        });
        
        alert(isEnabled ? '시스템 알림이 활성화되었습니다.' : '시스템 알림이 비활성화되었습니다.');
    }
    
    // 프로필 수정 시작
    editProfile() {
        const inputs = ['profileName', 'profileEmail', 'profilePhone', 'profileDept'];
        inputs.forEach(id => {
            const input = document.getElementById(id);
            if (input) input.removeAttribute('readonly');
        });
        
        document.getElementById('editProfileBtn').style.display = 'none';
        document.getElementById('saveProfileBtn').style.display = 'inline-block';
        document.getElementById('cancelProfileBtn').style.display = 'inline-block';
    }
    
    // 프로필 저장
    saveProfile() {
        const name = document.getElementById('profileName').value;
        const email = document.getElementById('profileEmail').value;
        const phone = document.getElementById('profilePhone').value;
        const dept = document.getElementById('profileDept').value;
        
        // 간단한 유효성 검사
        if (!name.trim() || !email.trim() || !phone.trim()) {
            alert('필수 정보를 입력해주세요.');
            return;
        }
        
        // 이메일 형식 검사
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('올바른 이메일 형식을 입력해주세요.');
            return;
        }
        
        // 저장 처리 (실제로는 서버에 전송)
        alert('프로필이 성공적으로 저장되었습니다.');
        this.cancelProfileEdit();
    }
    
    // 프로필 수정 취소
    cancelProfileEdit() {
        // 원래 값으로 복원
        document.getElementById('profileName').value = '김관리자';
        document.getElementById('profileEmail').value = 'admin@company.com';
        document.getElementById('profilePhone').value = '010-1234-5678';
        document.getElementById('profileDept').value = '관리팀';
        
        const inputs = ['profileName', 'profileEmail', 'profilePhone', 'profileDept'];
        inputs.forEach(id => {
            const input = document.getElementById(id);
            if (input) input.setAttribute('readonly', true);
        });
        
        document.getElementById('editProfileBtn').style.display = 'inline-block';
        document.getElementById('saveProfileBtn').style.display = 'none';
        document.getElementById('cancelProfileBtn').style.display = 'none';
    }
    
    // 비밀번호 변경
    changePassword() {
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // 유효성 검사
        if (!currentPassword || !newPassword || !confirmPassword) {
            alert('모든 필드를 입력해주세요.');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            alert('새 비밀번호가 일치하지 않습니다.');
            return;
        }
        
        if (newPassword.length < 8) {
            alert('새 비밀번호는 8자 이상이어야 합니다.');
            return;
        }
        
        // 현재 비밀번호 확인 (실제로는 서버에서 검증)
        if (currentPassword !== 'admin123') {
            alert('현재 비밀번호가 올바르지 않습니다.');
            return;
        }
        
        // 비밀번호 변경 처리
        alert('비밀번호가 성공적으로 변경되었습니다.');
        
        // 입력 필드 초기화
        document.getElementById('currentPassword').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';
    }
}

// 상품 관리 관련 함수들

// 상품 관리 섹션 전환 (상품관리 섹션에서만 작동)
function handleProductSectionClick(section) {
    // 상품관리 섹션이 활성화되어 있는지 확인
    const productSection = document.getElementById('product-management');
    if (!productSection || !productSection.classList.contains('active')) {
        return; // 상품관리 섹션이 아니면 실행하지 않음
    }
    
    // 상품관리 섹션 내의 네비게이션 버튼만 제어
    document.querySelectorAll('#product-management .nav-btn').forEach(btn => btn.classList.remove('active'));
    // 클릭된 버튼 활성화
    document.querySelector(`#product-management [data-section="${section}"]`)?.classList.add('active');
    
    // 상품관리 섹션 내의 섹션 콘텐츠만 제어
    document.querySelectorAll('#product-management .product-section').forEach(content => content.classList.remove('active'));
    
    // 선택된 섹션 콘텐츠 표시
    if (section === 'options') {
        document.getElementById('optionsSection')?.classList.add('active');
        // 기본 탭 활성화
        const activeTab = document.querySelector('#product-management .tab-btn.active')?.dataset.tab || 'categories';
        handleProductTabClick(activeTab);
    } else if (section === 'products') {
        document.getElementById('productsSection')?.classList.add('active');
        renderProductsList();
    }
}

// 상품 옵션 탭 전환 (상품관리 섹션에서만 작동)
function handleProductTabClick(tab) {
    // 상품관리 섹션이 활성화되어 있는지 확인
    const productSection = document.getElementById('product-management');
    if (!productSection || !productSection.classList.contains('active')) {
        return; // 상품관리 섹션이 아니면 실행하지 않음
    }
    
    // 상품관리 섹션 내의 탭 버튼만 제어
    document.querySelectorAll('#product-management .tab-btn').forEach(btn => btn.classList.remove('active'));
    // 클릭된 탭 활성화
    document.querySelector(`#product-management [data-tab="${tab}"]`)?.classList.add('active');
    
    // 상품관리 섹션 내의 탭 콘텐츠만 제어
    document.querySelectorAll('#product-management .tab-content').forEach(content => content.classList.remove('active'));
    // 선택된 탭 콘텐츠 표시
    document.getElementById(`${tab}-tab`)?.classList.add('active');
    
    // 탭별 데이터 렌더링
    renderProductOptionTab(tab);
}

// 상품 옵션 탭 데이터 렌더링
function renderProductOptionTab(tab) {
    // updateOptionTable 함수 사용
    updateOptionTable(tab);
}

// 상품 옵션 추가 모달 표시
// 중복 함수 제거됨 - 아래의 showAddOptionModal 함수 사용

// 중복 함수 제거됨 - App 클래스의 saveOption 메서드 사용

// 상품 목록 렌더링
function renderProductsList() {
    const tableBody = document.getElementById('productsTableBody');
    if (!tableBody) return;
    
    // localStorage에서 상품 데이터 로드
    loadProductsFromStorage();
    
    const products = window.products || [];
    
    if (products.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="8" class="empty-state">등록된 상품이 없습니다.</td></tr>';
        return;
    }
    
    tableBody.innerHTML = products.map(product => `
        <tr>
            <td><input type="checkbox" class="product-checkbox" data-id="${product.id}"></td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.institution}</td>
            <td>${product.assetType1}</td>
            <td>${product.assetType2}</td>
            <td>${product.paymentCycle}</td>
            <td class="text-center">
                <button class="btn btn-sm btn-outline" onclick="editProduct(${product.id})">수정</button>
                <button class="btn btn-sm btn-danger" onclick="deleteProduct(${product.id})">삭제</button>
            </td>
        </tr>
    `).join('');
}

// 상품 추가 모달 표시
function showAddProductModal() {
    console.log('showAddProductModal 호출됨');
    
    const modal = document.getElementById('addProductModal');
    if (!modal) {
        console.error('addProductModal 요소를 찾을 수 없습니다!');
        return;
    }
    
    // localStorage에서 최신 데이터 로드
    loadProductOptionsFromStorage();
    
    // 드롭다운 옵션 채우기
    populateProductFormOptions();
    
    // 폼 초기화
    const form = document.getElementById('addProductForm');
    if (form) {
        form.reset();
    }
    
    // 모달 표시
    modal.classList.add('show');
    modal.style.display = 'flex';
    
    console.log('모달 표시됨');
    console.log('모달 display:', modal.style.display);
    console.log('모달 visibility:', modal.style.visibility);
    console.log('모달 opacity:', modal.style.opacity);
}

// 상품 폼 드롭다운 옵션 채우기
function populateProductFormOptions() {
    console.log('=== populateProductFormOptions 호출됨 ===');
    console.log('호출 스택:', new Error().stack);
    console.log('호출 시간:', new Date().toISOString());
    
    // localStorage에서 데이터 로드
    loadProductOptionsFromStorage();
    
    console.log('로드된 productOptions:', window.productOptions);
    
    // 납입주기 데이터 확인 (강제 생성 제거)
    console.log('현재 paymentCycles:', window.productOptions.paymentCycles);
    
    // 카테고리
    const categorySelect = document.getElementById('productCategory');
    const categories = window.productOptions?.categories || [];
    console.log('카테고리 옵션들:', categories);
    categorySelect.innerHTML = '<option value="">선택하세요</option>' +
        categories.map(item => 
            `<option value="${item.id}">${item.name}</option>`
        ).join('');
    
    // 거래기관
    const institutionSelect = document.getElementById('productInstitution');
    const institutions = window.productOptions?.institutions || [];
    console.log('거래기관 옵션들:', institutions);
    institutionSelect.innerHTML = '<option value="">선택하세요</option>' +
        institutions.map(item => 
            `<option value="${item.id}">${item.name}</option>`
        ).join('');
    
    // 자산구분(1)
    const assetType1Select = document.getElementById('productAssetType1');
    const assetTypes1 = window.productOptions?.assetTypes1 || [];
    console.log('자산구분(1) 옵션들:', assetTypes1);
    assetType1Select.innerHTML = '<option value="">선택하세요</option>' +
        assetTypes1.map(item => 
            `<option value="${item.id}">${item.name}</option>`
        ).join('');
    
    // 납입주기 - 실제 데이터 사용
    const paymentCycleSelect = document.getElementById('productPaymentCycle');
    if (!paymentCycleSelect) {
        console.error('productPaymentCycle 요소를 찾을 수 없습니다!');
        return;
    }
    
    console.log('paymentCycleSelect 요소 찾음:', paymentCycleSelect);
    
    // 실제 localStorage에서 납입주기 데이터 읽기
    console.log('=== 납입주기 디버깅 시작 ===');
    console.log('window.productOptions:', window.productOptions);
    console.log('window.productOptions.paymentCycles:', window.productOptions?.paymentCycles);
    
    const paymentCycles = window.productOptions?.paymentCycles || [];
    console.log('납입주기 옵션들:', paymentCycles);
    console.log('paymentCycles 길이:', paymentCycles.length);
    console.log('paymentCycles 타입:', typeof paymentCycles);
    
    if (paymentCycles.length === 0) {
        console.warn('납입주기 데이터가 없습니다. 컬럼 옵션 관리에서 납입주기를 추가해주세요.');
        paymentCycleSelect.innerHTML = '<option value="">납입주기를 먼저 추가해주세요</option>';
    } else {
        console.log('납입주기 데이터 발견, HTML 생성 중...');
        // 실제 데이터로 HTML 생성
        const optionsHTML = paymentCycles.map(item => 
            `<option value="${item.id}">${item.name}</option>`
        ).join('');
        
        paymentCycleSelect.innerHTML = '<option value="">선택하세요</option>' + optionsHTML;
        console.log('생성된 optionsHTML:', optionsHTML);
    }
    
    console.log('최종 납입주기 select HTML:', paymentCycleSelect.innerHTML);
    console.log('=== 납입주기 디버깅 끝 ===');
    
    console.log('납입주기 드롭다운 설정 완료');
    
    // 자산구분(1) 변경 이벤트 - 자산구분(2) 필터링
    assetType1Select.addEventListener('change', function() {
        const selectedAssetType1 = this.value;
        const assetType2Select = document.getElementById('productAssetType2');
        
        if (!selectedAssetType1) {
            assetType2Select.innerHTML = '<option value="">선택하세요</option>';
            return;
        }
        
        // 선택된 자산구분(1)의 ID 찾기
        const assetType1Item = (window.productOptions?.assetTypes1 || []).find(item => item.id == selectedAssetType1);
        
        if (assetType1Item) {
            // 연결된 자산구분(2) 필터링
            const connectedAssetTypes2 = (window.productOptions?.assetTypes2 || [])
                .filter(item => item.parentId == assetType1Item.id);
            
            assetType2Select.innerHTML = '<option value="">선택하세요</option>' +
                connectedAssetTypes2.map(item => 
                    `<option value="${item.id}">${item.name}</option>`
                ).join('');
        }
    });
}

// 상품 저장
function saveProduct() {
    console.log('saveProduct 함수 호출됨');
    
    // localStorage에서 최신 데이터 로드
    loadProductOptionsFromStorage();
    
    // 옵션명으로 실제 이름 가져오기
    const categoryName = getOptionNameById('productCategory', 'categories');
    const institutionName = getOptionNameById('productInstitution', 'institutions');
    const assetType1Name = getOptionNameById('productAssetType1', 'assetTypes1');
    const assetType2Name = getOptionNameById('productAssetType2', 'assetTypes2');
    const paymentCycleName = getOptionNameById('productPaymentCycle', 'paymentCycles');
    
    const productData = {
        name: document.getElementById('productName').value.trim(),
        category: categoryName,
        institution: institutionName,
        assetType1: assetType1Name,
        assetType2: assetType2Name,
        paymentCycle: paymentCycleName
    };
    
    console.log('상품 데이터:', productData);
    
    // 유효성 검사
    if (!productData.name || !productData.category || !productData.institution || 
        !productData.assetType1 || !productData.assetType2 || !productData.paymentCycle) {
        alert('모든 필드를 입력하세요.');
        return;
    }
    
    // localStorage에서 상품 데이터 로드
    loadProductsFromStorage();
    
    // 중복 검사
    if (window.products.some(product => product.name === productData.name)) {
        alert('이미 존재하는 상품명입니다.');
        return;
    }
    
    // 새 상품 추가
    const newProduct = {
        id: Math.max(...(window.products.map(p => p.id) || [0]), 0) + 1,
        ...productData
    };
    
    window.products.push(newProduct);
    saveProductsToStorage();
    
    // UI 업데이트
    renderProductsList();
    
    // 모달 닫기
    const addProductModal = document.getElementById('addProductModal');
    addProductModal.classList.remove('show');
    addProductModal.style.display = 'none';
    
    alert('상품이 추가되었습니다.');
}

// 상품 옵션 수정
function editProductOption(optionType, id) {
    let targetData;
    
    if (optionType === 'categories') {
        targetData = app.dataManager.productOptions.categories;
    } else if (optionType === 'institutions') {
        targetData = app.dataManager.productOptions.institutions;
    } else if (optionType === 'assetTypes1') {
        targetData = app.dataManager.settingsData.assetTypes1;
    } else if (optionType === 'assetTypes2') {
        targetData = app.dataManager.settingsData.assetTypes2;
    } else if (optionType === 'paymentCycle') {
        targetData = app.dataManager.productOptions.paymentCycle;
    }
    
    const option = targetData.find(item => item.id === id);
    if (!option) return;
    
    const newName = prompt('옵션명을 수정하세요:', option.name);
    if (!newName || newName.trim() === '') return;
    
    // 중복 검사 (자신 제외)
    if (targetData.some(item => item.id !== id && item.name === newName.trim())) {
        alert('이미 존재하는 옵션명입니다.');
        return;
    }
    
    option.name = newName.trim();
    renderProductOptionTab(optionType);
    alert('옵션이 수정되었습니다.');
}

// 상품 옵션 삭제
function deleteProductOption(optionType, id) {
    let targetData;
    
    if (optionType === 'categories') {
        targetData = app.dataManager.productOptions.categories;
    } else if (optionType === 'institutions') {
        targetData = app.dataManager.productOptions.institutions;
    } else if (optionType === 'assetTypes1') {
        targetData = app.dataManager.settingsData.assetTypes1;
    } else if (optionType === 'assetTypes2') {
        targetData = app.dataManager.settingsData.assetTypes2;
    } else if (optionType === 'paymentCycle') {
        targetData = app.dataManager.productOptions.paymentCycle;
    }
    
    const option = targetData.find(item => item.id === id);
    if (!option) return;
    
    // 자산구분(1) 삭제 시 연결된 자산구분(2) 확인
    if (optionType === 'assetTypes1') {
        const connectedAssets = app.dataManager.settingsData.assetTypes2.filter(asset => asset.parentId === id);
        if (connectedAssets.length > 0) {
            if (!confirm(`이 자산구분(1)을 삭제하면 연결된 ${connectedAssets.length}개의 자산구분(2) 항목도 함께 삭제됩니다. 계속하시겠습니까?`)) {
                return;
            }
            // 연결된 자산구분(2) 삭제
            app.dataManager.settingsData.assetTypes2 = app.dataManager.settingsData.assetTypes2.filter(asset => asset.parentId !== id);
        }
    }
    
    if (confirm(`'${option.name}' 옵션을 삭제하시겠습니까?`)) {
        const index = targetData.findIndex(item => item.id === id);
        targetData.splice(index, 1);
        renderProductOptionTab(optionType);
        alert('옵션이 삭제되었습니다.');
    }
}

// 상품 수정
function editProduct(id) {
    alert('상품 수정 기능은 준비 중입니다.');
}

// 상품 삭제
function deleteProduct(id) {
    // localStorage에서 상품 데이터 로드
    loadProductsFromStorage();
    
    const product = window.products.find(p => p.id === id);
    if (!product) return;
    
    if (confirm(`'${product.name}' 상품을 삭제하시겠습니까?`)) {
        window.products = window.products.filter(p => p.id !== id);
        saveProductsToStorage();
        renderProductsList();
        alert('상품이 삭제되었습니다.');
    }
}

// 앱 초기화
const app = new CorporateManagementApp();

// 전역 이벤트 리스너 - 상품 모달
document.addEventListener('DOMContentLoaded', function() {
    // 상품 추가 모달 이벤트
    const addProductModal = document.getElementById('addProductModal');
    const cancelProductBtn = document.getElementById('cancelProductBtn');
    const saveProductBtn = document.getElementById('saveProductBtn');
    
    if (cancelProductBtn) {
        cancelProductBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('취소 버튼 클릭됨');
            addProductModal.style.display = 'none';
            document.getElementById('addProductForm').reset();
        });
    }
    
    if (saveProductBtn) {
        saveProductBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('저장 버튼 클릭됨');
            saveProduct();
        });
    }
    
    // 모달 닫기 이벤트 (X 버튼)
    const closeBtn = addProductModal?.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('X 버튼 클릭됨');
            addProductModal.style.display = 'none';
            document.getElementById('addProductForm').reset();
        });
    }
    
    // 모달 외부 클릭 시 닫기
    if (addProductModal) {
        addProductModal.addEventListener('click', function(e) {
            if (e.target === addProductModal) {
                console.log('모달 외부 클릭됨');
                addProductModal.classList.remove('show');
                addProductModal.style.display = 'none';
                document.getElementById('addProductForm').reset();
            }
        });
    }
});

// 전역 이벤트 리스너
document.addEventListener('click', (e) => {
    // 사용자 드롭다운 닫기
    if (!e.target.closest('.user-menu')) {
        document.querySelector('.user-dropdown').classList.remove('show');
    }
});

// 전역 함수들
function editCorporateAccount(id) {
    console.log('법인 계정 수정:', id);
    alert('법인 계정 수정 기능을 구현하세요.');
}

function deleteCorporateAccount(id) {
    if (confirm('정말로 이 법인 계정을 삭제하시겠습니까?')) {
        console.log('법인 계정 삭제:', id);
        alert('법인 계정이 삭제되었습니다.');
    }
}

function editStaff(id) {
    console.log('담당자 수정:', id);
    alert('담당자 수정 기능을 구현하세요.');
}

function deleteStaff(id) {
    if (confirm('정말로 이 담당자를 삭제하시겠습니까?')) {
        console.log('담당자 삭제:', id);
        alert('담당자가 삭제되었습니다.');
    }
}

function editDocumentType(id) {
    console.log('서류명 수정:', id);
    alert('서류명 수정 기능을 구현하세요.');
}

function deleteDocumentType(id) {
    if (confirm('정말로 이 서류명을 삭제하시겠습니까?')) {
        console.log('서류명 삭제:', id);
        alert('서류명이 삭제되었습니다.');
    }
}

function showAddOptionModal(type) {
    const modal = document.getElementById('addOptionModal');
    const title = document.getElementById('optionModalTitle');
    const parentGroup = document.getElementById('parentAssetGroup');
    
    // 탭 전환
    const tabBtn = document.querySelector(`[data-tab="${type}"]`);
    if (tabBtn) {
        tabBtn.click();
    }
    
    // 제목 설정
    const typeNames = {
        'categories': '카테고리',
        'institutions': '거래기관',
        'assetTypes1': '자산구분(1)',
        'assetTypes2': '자산구분(2)',
        'paymentCycle': '납입주기'
    };
    
    title.textContent = `${typeNames[type] || type} 추가`;
    
    // 자산구분(2)인 경우 상위 선택 표시
    if (type === 'assetTypes2') {
        parentGroup.style.display = 'block';
        // 자산구분(1) 옵션 로드
        const parentSelect = document.getElementById('parentAssetType');
        parentSelect.innerHTML = '<option value="">선택하세요</option>';
        
        // localStorage에서 데이터 로드
        loadProductOptionsFromStorage();
        
        if (window.productOptions && window.productOptions.assetTypes1) {
            window.productOptions.assetTypes1.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.id;
                optionElement.textContent = option.name;
                parentSelect.appendChild(optionElement);
            });
        }
    } else {
        parentGroup.style.display = 'none';
    }
    
    // 폼 초기화
    document.getElementById('addOptionForm').reset();
    
    // 추가 모드임을 표시
    modal.dataset.editMode = 'false';
    modal.dataset.editTab = '';
    modal.dataset.editId = '';
    
    modal.style.display = 'block';
}

// 중복 함수 제거됨 - 위의 showAddProductModal 함수 사용

function editOption(tabName, id) {
    console.log('옵션 수정:', tabName, id);
    
    // 데이터 로드
    loadProductOptionsFromStorage();
    
    // 수정할 옵션 찾기
    const options = window.productOptions[tabName];
    const option = options.find(opt => opt.id === id);
    
    if (!option) {
        alert('수정할 옵션을 찾을 수 없습니다.');
        return;
    }
    
    // 모달 열기
    const modal = document.getElementById('addOptionModal');
    const title = document.getElementById('optionModalTitle');
    const parentGroup = document.getElementById('parentAssetGroup');
    
    // 제목 변경
    const typeNames = {
        'categories': '카테고리',
        'institutions': '거래기관',
        'assetTypes1': '자산구분(1)',
        'assetTypes2': '자산구분(2)',
        'paymentCycles': '납입주기'
    };
    
    title.textContent = `${typeNames[tabName] || tabName} 수정`;
    
    // 자산구분(2)인 경우 상위 선택 표시
    if (tabName === 'assetTypes2') {
        parentGroup.style.display = 'block';
        const parentSelect = document.getElementById('parentAssetType');
        parentSelect.innerHTML = '<option value="">선택하세요</option>';
        
        if (window.productOptions && window.productOptions.assetTypes1) {
            window.productOptions.assetTypes1.forEach(opt => {
                const optionElement = document.createElement('option');
                optionElement.value = opt.id;
                optionElement.textContent = opt.name;
                if (opt.id === option.parentId) {
                    optionElement.selected = true;
                }
                parentSelect.appendChild(optionElement);
            });
        }
    } else {
        parentGroup.style.display = 'none';
    }
    
    // 폼에 기존 값 설정
    document.getElementById('optionName').value = option.name;
    
    // 수정 모드임을 표시
    modal.dataset.editMode = 'true';
    modal.dataset.editTab = tabName;
    modal.dataset.editId = id;
    
    modal.style.display = 'block';
}

function deleteOption(tabName, id) {
    if (confirm('정말로 이 옵션을 삭제하시겠습니까?')) {
        // 데이터 로드
        loadProductOptionsFromStorage();
        
        const options = window.productOptions[tabName];
        const index = options.findIndex(option => option.id === id);
        
        if (index > -1) {
            options.splice(index, 1);
            
            // localStorage에 저장
            saveProductOptionsToStorage();
            
            // 테이블 업데이트
            updateOptionTable(tabName);
            
            alert('옵션이 삭제되었습니다.');
        }
    }
}

// 전역 옵션 저장 함수
function saveOptionGlobal() {
    console.log('전역 saveOptionGlobal 호출됨');
    
    const modal = document.getElementById('addOptionModal');
    const isEditMode = modal.dataset.editMode === 'true';
    const optionName = document.getElementById('optionName').value.trim();
    
    // 수정 모드인 경우 해당 탭 사용, 아니면 현재 활성 탭 사용
    const currentTab = isEditMode ? modal.dataset.editTab : document.querySelector('.tab-btn.active').dataset.tab;
    
    console.log('옵션명:', optionName);
    console.log('현재 탭:', currentTab);
    console.log('수정 모드:', isEditMode);
    
    if (!optionName) {
        alert('옵션명을 입력해주세요.');
        return;
    }
    
    // 자산구분(2)인 경우 상위 선택 확인
    if (currentTab === 'assetTypes2') {
        const parentId = document.getElementById('parentAssetType').value;
        if (!parentId) {
            alert('상위 자산구분(1)을 선택해주세요.');
            return;
        }
    }
    
    // 데이터 로드
    loadProductOptionsFromStorage();
    
    if (isEditMode) {
        // 수정 모드
        const editId = parseInt(modal.dataset.editId);
        const options = window.productOptions[currentTab];
        const optionIndex = options.findIndex(opt => opt.id === editId);
        
        if (optionIndex > -1) {
            // 기존 옵션 수정
            options[optionIndex].name = optionName;
            options[optionIndex].parentId = currentTab === 'assetTypes2' ? parseInt(document.getElementById('parentAssetType').value) : null;
            
            console.log('수정된 옵션:', options[optionIndex]);
        } else {
            alert('수정할 옵션을 찾을 수 없습니다.');
            return;
        }
    } else {
        // 추가 모드
        const optionData = {
            id: Date.now(),
            name: optionName,
            parentId: currentTab === 'assetTypes2' ? parseInt(document.getElementById('parentAssetType').value) : null
        };
        
        console.log('새 옵션 데이터:', optionData);
        
        // 해당 탭의 배열이 존재하지 않으면 생성
        if (!window.productOptions[currentTab]) {
            window.productOptions[currentTab] = [];
        }
        
        window.productOptions[currentTab].push(optionData);
        console.log('추가 후 데이터:', window.productOptions[currentTab]);
    }
    
    // localStorage에 저장
    saveProductOptionsToStorage();
    
    // 테이블 업데이트
    updateOptionTable(currentTab);
    
    // 모달 닫기 및 초기화
    modal.style.display = 'none';
    document.getElementById('addOptionForm').reset();
    
    // 수정 모드 플래그 초기화
    modal.dataset.editMode = 'false';
    modal.dataset.editTab = '';
    modal.dataset.editId = '';
    
    alert(isEditMode ? '옵션이 수정되었습니다.' : '옵션이 추가되었습니다.');
}

// localStorage에서 상품 옵션 데이터 로드
function loadProductOptionsFromStorage() {
    console.log('loadProductOptionsFromStorage 호출됨');
    
    const stored = localStorage.getItem('productOptions');
    if (stored) {
        window.productOptions = JSON.parse(stored);
        console.log('localStorage에서 로드된 데이터:', window.productOptions);
    } else {
        console.log('localStorage에 데이터가 없어서 초기 데이터 설정');
        // 초기 데이터 설정
        window.productOptions = {
            categories: [
                { id: 1, name: '절세자산', parentId: null },
                { id: 2, name: '투자자산', parentId: null },
                { id: 3, name: '보장자산', parentId: null }
            ],
            institutions: [
                { id: 1, name: '삼성증권', parentId: null },
                { id: 2, name: 'KB증권', parentId: null },
                { id: 3, name: 'NH투자증권', parentId: null },
                { id: 4, name: '신한투자증권', parentId: null }
            ],
            assetTypes1: [
                { id: 1, name: '절세자산', parentId: null },
                { id: 2, name: '투자자산', parentId: null },
                { id: 3, name: '보장자산', parentId: null }
            ],
            assetTypes2: [
                { id: 1, name: '연금저축', parentId: 1 },
                { id: 2, name: '연금보험', parentId: 1 },
                { id: 3, name: '펀드', parentId: 2 },
                { id: 4, name: '주식', parentId: 2 },
                { id: 5, name: '보험', parentId: 3 }
            ],
            paymentCycles: [
                { id: 1, name: '월납', parentId: null },
                { id: 2, name: '분기납', parentId: null },
                { id: 3, name: '반년납', parentId: null },
                { id: 4, name: '연납', parentId: null }
            ]
        };
        console.log('초기 데이터 설정 완료:', window.productOptions);
        saveProductOptionsToStorage();
    }
    
    console.log('최종 productOptions:', window.productOptions);
    console.log('paymentCycles:', window.productOptions?.paymentCycles);
    console.log('paymentCycles 길이:', window.productOptions?.paymentCycles?.length);
    console.log('paymentCycles 내용:', window.productOptions?.paymentCycles);
}

// localStorage에 상품 옵션 데이터 저장
function saveProductOptionsToStorage() {
    localStorage.setItem('productOptions', JSON.stringify(window.productOptions));
}

// localStorage에서 상품 데이터 로드
function loadProductsFromStorage() {
    const stored = localStorage.getItem('products');
    if (stored) {
        window.products = JSON.parse(stored);
    } else {
        // 초기 상품 데이터 설정
        window.products = [
            {
                id: 1,
                name: '삼성연금저축',
                category: '절세자산',
                institution: '삼성증권',
                assetType1: '절세자산',
                assetType2: '연금저축',
                paymentCycle: '월납'
            },
            {
                id: 2,
                name: 'KB펀드',
                category: '투자자산',
                institution: 'KB증권',
                assetType1: '투자자산',
                assetType2: '펀드',
                paymentCycle: '월납'
            }
        ];
        saveProductsToStorage();
    }
}

// localStorage에 상품 데이터 저장
function saveProductsToStorage() {
    localStorage.setItem('products', JSON.stringify(window.products));
}

// ID로 옵션명 가져오기
function getOptionNameById(selectId, dataKey) {
    const select = document.getElementById(selectId);
    if (!select) return '';
    
    const selectedValue = select.value;
    if (!selectedValue) return '';
    
    // localStorage에서 데이터 로드
    loadProductOptionsFromStorage();
    
    const options = window.productOptions[dataKey] || [];
    const option = options.find(opt => opt.id == selectedValue);
    
    return option ? option.name : selectedValue;
}

// 옵션 테이블 업데이트
function updateOptionTable(tabName) {
    const tbody = document.getElementById(`${tabName}TableBody`);
    if (!tbody) return;
    
    const options = window.productOptions[tabName];
    console.log(`updateOptionTable - ${tabName}:`, options);
    
    if (!options || options.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" class="empty-state">등록된 옵션이 없습니다.</td></tr>';
    } else {
        if (tabName === 'assetTypes2') {
            // 자산구분(2)의 경우 계층적으로 표시
            const parentOptions = window.productOptions.assetTypes1 || [];
            const sortedParents = parentOptions.sort((a, b) => a.id - b.id);
            
            console.log('자산구분(1) 옵션들:', parentOptions);
            console.log('자산구분(2) 옵션들:', options);
            
            let html = '';
            
            sortedParents.forEach(parent => {
                const childOptions = options.filter(option => option.parentId == parent.id);
                console.log(`${parent.name}의 자식 옵션들:`, childOptions);
                if (childOptions.length > 0) {
                    // 그룹 헤더 추가
                    html += `
                        <tr class="group-header">
                            <td colspan="3">${parent.name}</td>
                        </tr>
                    `;
                    
                    // 해당 자산구분(2)들 추가
                    const sortedChildren = childOptions.sort((a, b) => a.name.localeCompare(b.name));
                    html += sortedChildren.map(option => `
                        <tr class="group-item">
                            <td>${option.name}</td>
                            <td>${getParentName(option.parentId)}</td>
                            <td class="text-center">
                                <button class="btn btn-sm btn-outline" onclick="editOption('${tabName}', ${option.id})">수정</button>
                                <button class="btn btn-sm btn-danger" onclick="deleteOption('${tabName}', ${option.id})">삭제</button>
                            </td>
                        </tr>
                    `).join('');
                }
            });
            
            // parentId가 없는 옵션들도 추가 (혹시 있을 경우)
            const orphanOptions = options.filter(option => !option.parentId);
            if (orphanOptions.length > 0) {
                html += `
                    <tr class="group-header">
                        <td colspan="3">기타</td>
                    </tr>
                `;
                html += orphanOptions.sort((a, b) => a.name.localeCompare(b.name)).map(option => `
                    <tr class="group-item">
                        <td>${option.name}</td>
                        <td>-</td>
                        <td class="text-center">
                            <button class="btn btn-sm btn-outline" onclick="editOption('${tabName}', ${option.id})">수정</button>
                            <button class="btn btn-sm btn-danger" onclick="deleteOption('${tabName}', ${option.id})">삭제</button>
                        </td>
                    </tr>
                `).join('');
            }
            
            tbody.innerHTML = html;
        } else {
            // 다른 옵션들은 기존대로 표시
            tbody.innerHTML = options.map(option => `
                <tr>
                    <td>${option.name}</td>
                    <td>${option.parentId ? getParentName(option.parentId) : '-'}</td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-outline" onclick="editOption('${tabName}', ${option.id})">수정</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteOption('${tabName}', ${option.id})">삭제</button>
                    </td>
                </tr>
            `).join('');
        }
    }
}

// 계층적 옵션 정렬 함수
function getHierarchicalOptions(options) {
    // 자산구분(1) 옵션들을 먼저 가져옴
    const parentOptions = window.productOptions.assetTypes1 || [];
    
    // 자산구분(1) 순서대로 정렬
    const sortedParents = parentOptions.sort((a, b) => a.id - b.id);
    
    const result = [];
    
    // 각 자산구분(1)에 대해 해당하는 자산구분(2)들을 추가
    sortedParents.forEach(parent => {
        const childOptions = options.filter(option => option.parentId === parent.id);
        if (childOptions.length > 0) {
            // 자산구분(2)들을 이름순으로 정렬
            const sortedChildren = childOptions.sort((a, b) => a.name.localeCompare(b.name));
            result.push(...sortedChildren);
        }
    });
    
    // parentId가 없는 옵션들도 추가 (혹시 있을 경우)
    const orphanOptions = options.filter(option => !option.parentId);
    if (orphanOptions.length > 0) {
        result.push(...orphanOptions.sort((a, b) => a.name.localeCompare(b.name)));
    }
    
    return result;
}

// 상위 옵션명 가져오기 (전역 함수)
function getParentName(parentId) {
    if (window.productOptions && window.productOptions.assetTypes1) {
        const parent = window.productOptions.assetTypes1.find(option => option.id == parentId);
        return parent ? parent.name : '-';
    }
    return '-';
}

function editCategory(id) {
    console.log('카테고리 수정:', id);
    alert('카테고리 수정 기능을 구현하세요.');
}

function deleteCategory(id) {
    if (confirm('정말로 이 카테고리를 삭제하시겠습니까?')) {
        console.log('카테고리 삭제:', id);
        alert('카테고리가 삭제되었습니다.');
    }
}

function editInstitution(id) {
    console.log('거래기관 수정:', id);
    alert('거래기관 수정 기능을 구현하세요.');
}

function deleteInstitution(id) {
    if (confirm('정말로 이 거래기관을 삭제하시겠습니까?')) {
        console.log('거래기관 삭제:', id);
        alert('거래기관이 삭제되었습니다.');
    }
}

function editAssetType(type, id) {
    console.log(`자산구분(${type}) 수정:`, id);
    alert(`자산구분(${type}) 수정 기능을 구현하세요.`);
}

function deleteAssetType(type, id) {
    if (confirm(`정말로 이 자산구분(${type})을 삭제하시겠습니까?`)) {
        console.log(`자산구분(${type}) 삭제:`, id);
        alert(`자산구분(${type})이 삭제되었습니다.`);
    }
}

function editPaymentCycle(id) {
    console.log('납입주기 수정:', id);
    alert('납입주기 수정 기능을 구현하세요.');
}

function deletePaymentCycle(id) {
    if (confirm('정말로 이 납입주기를 삭제하시겠습니까?')) {
        console.log('납입주기 삭제:', id);
        alert('납입주기가 삭제되었습니다.');
    }
}

function editProduct(id) {
    console.log('상품 수정:', id);
    alert('상품 수정 기능을 구현하세요.');
}

function deleteProduct(id) {
    if (confirm('정말로 이 상품을 삭제하시겠습니까?')) {
        console.log('상품 삭제:', id);
        alert('상품이 삭제되었습니다.');
    }
}

// 폼 유효성 검사
document.addEventListener('DOMContentLoaded', () => {
    // 이메일 유효성 검사
    document.getElementById('email').addEventListener('blur', (e) => {
        const email = e.target.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            e.target.style.borderColor = '#EF4444';
        } else {
            e.target.style.borderColor = '#D1D5DB';
        }
    });
    
    // 비밀번호 강도 검사
    document.getElementById('password').addEventListener('input', (e) => {
        const password = e.target.value;
        if (password.length > 0 && password.length < 8) {
            e.target.style.borderColor = '#F59E0B';
        } else if (password.length >= 8) {
            e.target.style.borderColor = '#10B981';
        } else {
            e.target.style.borderColor = '#D1D5DB';
        }
    });
    
    // 법인 계정 관리 이벤트 바인딩
    app.bindCorporateAccountEvents = function() {
        // 법인 계정 추가 버튼
        this.addButtonListener('addCorporateAccountBtn', () => this.showAddCorporateAccountModal());
        
        // 검색 버튼
        this.addButtonListener('searchCorporateBtn', () => this.searchCorporateAccounts());
        
        // 전체 선택 체크박스
        const selectAllCorporates = document.getElementById('selectAllCorporates');
        if (selectAllCorporates) {
            selectAllCorporates.addEventListener('change', (e) => this.toggleSelectAllCorporates(e.target.checked));
        }
        
        // 대량 작업 버튼들
        this.addButtonListener('bulkActivateBtn', () => this.bulkUpdateCorporateStatus('활성'));
        this.addButtonListener('bulkDeactivateBtn', () => this.bulkUpdateCorporateStatus('비활성'));
        this.addButtonListener('bulkDeleteBtn', () => this.bulkDeleteCorporateAccounts());
        
        // 모달 이벤트
        this.addButtonListener('saveCorporateAccountBtn', () => this.saveCorporateAccount());
        this.addButtonListener('cancelCorporateAccountBtn', () => this.hideCorporateAccountModal());
        
        // 모달 닫기 버튼
        const corporateModal = document.getElementById('corporateAccountModal');
        if (corporateModal) {
            const closeBtn = corporateModal.querySelector('.close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => this.hideCorporateAccountModal());
            }
        }
    };
    
    // 법인 계정 관리 함수들
    app.showAddCorporateAccountModal = function() {
        this.editingCorporateAccount = null;
        document.getElementById('corporateAccountModalTitle').textContent = '법인 계정 추가';
        this.clearCorporateAccountForm();
        document.getElementById('corpRegistrationDate').value = new Date().toISOString().split('T')[0];
        this.showModal('corporateAccountModal');
    };
    
    app.showEditCorporateAccountModal = function(account) {
        this.editingCorporateAccount = account;
        document.getElementById('corporateAccountModalTitle').textContent = '법인 계정 수정';
        this.populateCorporateAccountForm(account);
        this.showModal('corporateAccountModal');
    };
    
    app.clearCorporateAccountForm = function() {
        document.getElementById('corpName').value = '';
        document.getElementById('corpCeo').value = '';
        document.getElementById('corpManager').value = '';
        document.getElementById('corpPhone').value = '';
        document.getElementById('corpEmail').value = '';
        document.getElementById('corpPassword').value = '';
        document.getElementById('corpAddress').value = '';
        document.getElementById('corpBusinessNumber').value = '';
        document.getElementById('corpStatus').value = '활성';
        document.getElementById('corpRegistrationDate').value = '';
        document.getElementById('corpNotes').value = '';
        document.getElementById('corpNotificationEnabled').checked = true;
    };
    
    app.populateCorporateAccountForm = function(account) {
        document.getElementById('corpName').value = account.name || '';
        document.getElementById('corpCeo').value = account.ceo || '';
        document.getElementById('corpManager').value = account.manager || '';
        document.getElementById('corpPhone').value = account.phone || '';
        document.getElementById('corpEmail').value = account.email || '';
        document.getElementById('corpPassword').value = account.password || '';
        document.getElementById('corpAddress').value = account.address || '';
        document.getElementById('corpBusinessNumber').value = account.businessNumber || '';
        document.getElementById('corpStatus').value = account.status || '활성';
        document.getElementById('corpRegistrationDate').value = account.registrationDate || '';
        document.getElementById('corpNotes').value = account.notes || '';
        document.getElementById('corpNotificationEnabled').checked = account.notificationEnabled !== false;
    };
    
    app.saveCorporateAccount = function() {
        const formData = {
            name: document.getElementById('corpName').value,
            ceo: document.getElementById('corpCeo').value,
            manager: document.getElementById('corpManager').value,
            phone: document.getElementById('corpPhone').value,
            email: document.getElementById('corpEmail').value,
            password: document.getElementById('corpPassword').value,
            address: document.getElementById('corpAddress').value,
            businessNumber: document.getElementById('corpBusinessNumber').value,
            status: document.getElementById('corpStatus').value,
            registrationDate: document.getElementById('corpRegistrationDate').value,
            notes: document.getElementById('corpNotes').value,
            notificationEnabled: document.getElementById('corpNotificationEnabled').checked
        };

        // 필수 필드 검증
        if (!formData.name || !formData.ceo || !formData.manager || !formData.phone || !formData.email || !formData.password) {
            alert('필수 필드를 모두 입력해주세요.');
            return;
        }

        // 이메일 중복 검사
        const existingAccount = this.corporateAccounts.find(acc => 
            acc.email === formData.email && (!this.editingCorporateAccount || acc.id !== this.editingCorporateAccount.id)
        );
        if (existingAccount) {
            alert('이미 사용 중인 이메일입니다.');
            return;
        }

        if (this.editingCorporateAccount) {
            // 수정
            const index = this.corporateAccounts.findIndex(acc => acc.id === this.editingCorporateAccount.id);
            if (index !== -1) {
                this.corporateAccounts[index] = { ...this.editingCorporateAccount, ...formData };
            }
        } else {
            // 추가
            const newAccount = {
                id: Math.max(...this.corporateAccounts.map(acc => acc.id)) + 1,
                ...formData,
                lastLogin: null
            };
            this.corporateAccounts.push(newAccount);
        }

        this.hideCorporateAccountModal();
        this.loadCorporateAccountsTable();
        alert(this.editingCorporateAccount ? '법인 계정이 수정되었습니다.' : '법인 계정이 추가되었습니다.');
    };
    
    app.hideCorporateAccountModal = function() {
        this.hideModal('corporateAccountModal');
        this.editingCorporateAccount = null;
    };
    
    app.showModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
            modal.style.display = 'flex';
        }
    };

    app.hideModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
            modal.style.display = 'none';
        }
    };
    
    // 법인 계정 테이블 로드
    app.loadCorporateAccountsTable = function(accounts = null) {
        const tableBody = document.getElementById('corporateAccountsTableBody');
        const totalElement = document.getElementById('totalCorporates');
        
        if (!tableBody) return;
        
        const accountsToShow = accounts || this.corporateAccounts;
        
        tableBody.innerHTML = '';
        
        if (accountsToShow.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="10" class="text-center" style="padding: 2rem; color: #6B7280;">
                        등록된 법인 계정이 없습니다.
                    </td>
                </tr>
            `;
        } else {
            accountsToShow.forEach(account => {
                const row = document.createElement('tr');
                
                const statusClass = account.status === '활성' ? 'status-active' : 
                                   account.status === '비활성' ? 'status-inactive' : 'status-pending';
                
                const lastLoginText = account.lastLogin ? 
                    this.formatLastLogin(account.lastLogin) : 
                    '<span class="last-login-never">접속 기록 없음</span>';
                
                row.innerHTML = `
                    <td><input type="checkbox" class="corporate-checkbox" data-id="${account.id}"></td>
                    <td><strong>${account.name}</strong></td>
                    <td>${account.ceo}</td>
                    <td>${account.manager}</td>
                    <td>${account.phone}</td>
                    <td>${account.email}</td>
                    <td>${account.registrationDate}</td>
                    <td><span class="${statusClass}">${account.status}</span></td>
                    <td>${lastLoginText}</td>
                    <td class="text-center">
                        <div class="action-buttons">
                            <button class="btn btn-sm btn-outline" onclick="app.showEditCorporateAccountModal(${JSON.stringify(account).replace(/"/g, '&quot;')})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="app.deleteCorporateAccount(${account.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                `;
                
                tableBody.appendChild(row);
            });
        }
        
        if (totalElement) {
            totalElement.textContent = accountsToShow.length;
        }
        
        this.updateBulkActionButtons();
    };
    
    // 마지막 접속 시간 포맷
    app.formatLastLogin = function(lastLogin) {
        const loginDate = new Date(lastLogin);
        const now = new Date();
        const diffHours = (now - loginDate) / (1000 * 60 * 60);
        
        if (diffHours < 24) {
            return `<span class="last-login-recent">${lastLogin}</span>`;
        } else if (diffHours < 168) { // 1주일
            return `<span class="last-login-recent">${lastLogin}</span>`;
        } else {
            return `<span class="last-login-old">${lastLogin}</span>`;
        }
    };
    
    // 검색 및 기타 함수들
    app.searchCorporateAccounts = function() {
        const searchTerm = document.getElementById('corporateSearchInput').value.toLowerCase();
        const statusFilter = document.getElementById('corporateStatusFilter').value;
        
        let filteredAccounts = this.corporateAccounts;
        
        if (searchTerm) {
            filteredAccounts = filteredAccounts.filter(acc => 
                acc.name.toLowerCase().includes(searchTerm) ||
                acc.ceo.toLowerCase().includes(searchTerm) ||
                acc.manager.toLowerCase().includes(searchTerm)
            );
        }
        
        if (statusFilter) {
            filteredAccounts = filteredAccounts.filter(acc => acc.status === statusFilter);
        }
        
        this.loadCorporateAccountsTable(filteredAccounts);
    };
    
    app.toggleSelectAllCorporates = function(checked) {
        const checkboxes = document.querySelectorAll('.corporate-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = checked;
        });
        this.updateBulkActionButtons();
    };
    
    app.updateBulkActionButtons = function() {
        const checkboxes = document.querySelectorAll('.corporate-checkbox:checked');
        const hasSelected = checkboxes.length > 0;
        
        const bulkActivateBtn = document.getElementById('bulkActivateBtn');
        const bulkDeactivateBtn = document.getElementById('bulkDeactivateBtn');
        const bulkDeleteBtn = document.getElementById('bulkDeleteBtn');
        
        if (bulkActivateBtn) bulkActivateBtn.disabled = !hasSelected;
        if (bulkDeactivateBtn) bulkDeactivateBtn.disabled = !hasSelected;
        if (bulkDeleteBtn) bulkDeleteBtn.disabled = !hasSelected;
    };
    
    app.bulkUpdateCorporateStatus = function(status) {
        const checkboxes = document.querySelectorAll('.corporate-checkbox:checked');
        const selectedIds = Array.from(checkboxes).map(cb => parseInt(cb.dataset.id));
        
        if (selectedIds.length === 0) {
            alert('선택된 법인 계정이 없습니다.');
            return;
        }
        
        if (confirm(`선택된 ${selectedIds.length}개 법인 계정의 상태를 '${status}'로 변경하시겠습니까?`)) {
            selectedIds.forEach(id => {
                const account = this.corporateAccounts.find(acc => acc.id === id);
                if (account) {
                    account.status = status;
                }
            });
            
            this.loadCorporateAccountsTable();
            alert(`${selectedIds.length}개 법인 계정의 상태가 변경되었습니다.`);
        }
    };
    
    app.bulkDeleteCorporateAccounts = function() {
        const checkboxes = document.querySelectorAll('.corporate-checkbox:checked');
        const selectedIds = Array.from(checkboxes).map(cb => parseInt(cb.dataset.id));
        
        if (selectedIds.length === 0) {
            alert('선택된 법인 계정이 없습니다.');
            return;
        }
        
        if (confirm(`선택된 ${selectedIds.length}개 법인 계정을 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`)) {
            this.corporateAccounts = this.corporateAccounts.filter(acc => !selectedIds.includes(acc.id));
            this.loadCorporateAccountsTable();
            alert(`${selectedIds.length}개 법인 계정이 삭제되었습니다.`);
        }
    };
    
    app.deleteCorporateAccount = function(id) {
        const account = this.corporateAccounts.find(acc => acc.id === id);
        if (!account) return;
        
        if (confirm(`'${account.name}' 법인 계정을 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`)) {
            this.corporateAccounts = this.corporateAccounts.filter(acc => acc.id !== id);
            this.loadCorporateAccountsTable();
            alert('법인 계정이 삭제되었습니다.');
        }
    };

    // 체크박스 변경 이벤트 위임
    document.addEventListener('change', (e) => {
        if (e.target.classList.contains('corporate-checkbox')) {
            if (window.app) {
                window.app.updateBulkActionButtons();
            }
        }
    });
});
