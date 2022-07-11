export const listSpecialized = [
    {
        text: 'NDMC',
        value: 'NDMC',
    },
    {
        text: 'CNTT',
        value: 'CNTT',
    },
    {
        text: 'TTYK',
        value: 'TTYK',
    },
    {
        text: 'BKCC',
        value: 'BKCC',
    },
    {
        text: 'BDCC',
        value: 'BDCC',
    },
    {
        text: 'BFFC',
        value: 'BFFC',
    },
    {
        text: 'BXZC',
        value: 'BXZC',
    },
];

export const indexColumnCourse = [
    {
        title: 'Khóa học',
        dataIndex: 'name',
        key: 'name',
        render: text => <b>{text}</b>,
        sorter: (a, b) => a.name.toLowerCase() < b.name.toLowerCase(),
        sortDirections: ['descend'],
    },
    {
        title: 'Giảng viên',
        dataIndex: 'teacherName',
        key: 'teacherName',
        sorter: (a, b) => a.teacherName.toLowerCase() < b.teacherName.toLowerCase(),
        sortDirections: ['descend'],
        render: text => <b>{text}</b>
    },
    {
        title: 'Mã ngành',
        dataIndex: 'specialized',
        key: 'specialized',
        render: text => <b><i>{text}</i></b>,
        sorter: (a, b) => a.specialized.toLowerCase() < b.specialized.toLowerCase(),
        sortDirections: ['descend'],
        filters: listSpecialized,
        onFilter: (value, record) => record.specialized.indexOf(value) === 0,
    },
];

export const indexColumnStudent = [
    {
        title: 'Họ và tên',
        dataIndex: 'name',
        key: 'name',
        render: text => <b>{text}</b>,
        sorter: (a, b) => a.name.toLowerCase() < b.name.toLowerCase(),
        sortDirections: ['descend'],
    },
    {
        title: 'Giới tính',
        dataIndex: 'gender',
        key: 'gender',
        render: text => <b>{text === "male" ? "Nam" : "Nữ"}</b>,
        sorter: (a, b) => a.gender.toLowerCase() < b.gender.toLowerCase(),
        sortDirections: ['descend'],
    },
    {
        title: 'Ngày sinh',
        dataIndex: 'birthday',
        key: 'birthday',
        render: text => <b><i>{text}</i></b>
    },
    {
        title: 'Mã khoa',
        dataIndex: 'specialized',
        key: 'specialized',
        render: text => <b><i>{text}</i></b>,
        sorter: (a, b) => a.specialized.toLowerCase() < b.specialized.toLowerCase(),
        sortDirections: ['descend'],
        filters: listSpecialized,
        onFilter: (value, record) => record.specialized.indexOf(value) === 0,
    }
]
