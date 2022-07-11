// import { createSlice } from "@reduxjs/toolkit";

// const coursesReduicer = createSlice({
//     name: 'courses',
//     initialState: [
//         {
//             id: 1,
//             name: 'Toán',
//             teacher: 'Hoàng Văn Nam',
//             specialized: 'CNTT',
//             submit: true,
//             listStudent: [],
//         },
//     ],
//     reducers: {
//         addCourse: (state, action) => {
//             state = [...state, action.payload];
//         },
//         updateCourse: (state, action) => {
//             state = state.map(
//                 (item) => {
//                     if (item.name == action.payload.name && item.id == action.payload.id && item.teacher == action.payload.teacher)
//                         return action.payload;
//                     else
//                         return item;
//                 }
//             )
//         },
//         deleteCourses: (state, action) => {
//             state = state.filter(
//                 (item) => (item.name != action.payload.name && item.id != action.payload.id && item.teacher != action.payload.teacher)
//             )
//         },
//     }
// })

import { v4 as uuid } from 'uuid';

const valueStoreInit = [
    {
        key: uuid(),
        name: 'Toán',
        teacher: 'Hoàng Văn Nam',
        specialized: 'CNTT',
        submit: true,
        listStudent: [],
    },
    {
        key: uuid(),
        name: 'Sinh học',
        teacher: 'Dương Văn Toàn',
        specialized: 'VBDS',
        submit: true,
        listStudent: [],
    },
    {
        key: uuid(),
        name: 'Kế toán học',
        teacher: 'Hoàng Vương',
        specialized: 'BKCC',
        submit: true,
        listStudent: [],
    },
    {
        key: uuid(),
        name: 'Toán',
        teacher: 'Hoàng Đức Chính',
        specialized: 'CNGT',
        submit: true,
        listStudent: [],
    },
    {
        key: uuid(),
        name: 'Toán',
        teacher: 'Trần Họa Văn',
        specialized: 'VBDS',
        submit: true,
        listStudent: [],
    },
    {
        key: uuid(),
        name: 'Toán',
        teacher: 'Quốc Nguyễn Dương',
        specialized: 'VBDS',
        submit: true,
        listStudent: [],
    },
]

const initState = localStorage.getItem('listCourse') ? JSON.parse(localStorage.getItem('listCourse')) : valueStoreInit;

const coursesReduicer = (state = initState, action) => {
    var result = state;
    switch (action.type) {
        case 'courses/addCourse':
            result = [
                ...state,
                action.payload,
            ];
            break;
        case 'courses/updateCourse':
            result = state.map(
                (item) => {
                    if (item.key == action.payload.key)
                        return action.payload;
                    else
                        return item;
                }
            );
            break;
        case 'courses/deleteCourse':
            result = state.filter(
                (item) => (
                    item.key !== action.payload.key
                )
            );
            break;
        case 'courses/updateListStudent':
            result = state.map(
                (course) => {
                    if (course.key == action.payload.key)
                        return { ...course, listStudent: action.payload.listStudent }
                    else
                        return course;
                }
            );
            break;
        case 'courses/removeStudentDeleted':
            result = state.map(
                (item) => { return { ...item, listStudent: item.listStudent.filter((key) => { return key != action.payload }) } }
            );
            break;
        default: result = state;
    }
    localStorage.setItem('listCourse', JSON.stringify(result));
    return result;
}

export default coursesReduicer;