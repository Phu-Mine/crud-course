import { v4 as uuid } from 'uuid';

const valueStoreInit = [
    {
        key: uuid(),
        name: 'Nguyễn Văn Trỗi',
        gender: 'male',
        birthday: '12/07/2001',
        specialized: 'BKCC',
    },
    {
        key: uuid(),
        name: 'Nguyễn Văn Trỗi',
        gender: 'male',
        birthday: '11/03/2000',
        specialized: 'BKCC',
    },
    {
        key: uuid(),
        name: 'Nguyễn Văn Trỗi',
        gender: 'male',
        birthday: '11/03/2000',
        specialized: 'BKCC',
    },
    {
        key: uuid(),
        name: 'Nguyễn Văn Trỗi',
        gender: 'male',
        birthday: '11/03/2000',
        specialized: 'BKCC',
    },
    {
        key: uuid(),
        name: 'Nguyễn Văn Trỗi',
        gender: 'male',
        birthday: '11/03/2000',
        specialized: 'BKCC',
    },
    {
        key: uuid(),
        name: 'Nguyễn Văn Trỗi',
        gender: 'male',
        birthday: '11/03/2000',
        specialized: 'BKCC',
    },
    {
        key: uuid(),
        name: 'Nguyễn Văn Trỗi',
        gender: 'male',
        birthday: '11/03/2000',
        specialized: 'BKCC',
    },
];

const initState = localStorage.getItem('listStudent') ? JSON.parse(localStorage.getItem('listStudent')) : valueStoreInit;

const studentsReduicer = (state = initState, action) => {
    var result = state;
    switch (action.type) {
        case 'students/addStudent':
            result = [
                ...state,
                action.payload,
            ];
            break;
        case 'students/updateStudent':
            result = state.map(
                (item) => {
                    if (item.key == action.payload.key)
                        return action.payload;
                    else
                        return item;
                }
            );
            break;
        case 'students/deleteStudent':
            result = state.filter(
                (user) => (user.key != action.payload.key)
            );
            break;
        default: result = state;
    }
    localStorage.setItem('listStudent', JSON.stringify(result));
    return result;
}

export default studentsReduicer;