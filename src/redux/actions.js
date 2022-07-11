export const addStudent = (data) => {
    return {
        type: 'students/addStudent',
        payload: data,
    }
}

export const updateStudent = (data) => {
    return {
        type: 'students/updateStudent',
        payload: data,
    }
}

export const deleteStudent = (data) => {
    return {
        type: 'students/deleteStudent',
        payload: data,
    }
}

////////////////////////////////////////////////////////////////////////////

export const addCourse = (data) => {
    return {
        type: 'courses/addCourse',
        payload: data,
    }
}

export const updateCourse = (data) => {
    return {
        type: 'courses/updateCourse',
        payload: data,
    }
}

export const deleteCourse = (data) => {
    return {
        type: 'courses/deleteCourse',
        payload: data,
    }
}

export const updateRegister = (data) => {
    return {
        type: 'courses/updateListStudent',
        payload: data,
    }
}

export const updateCourseAfterRemove = (key) => {
    return {
        type: 'courses/removeStudentDeleted',
        payload: key,
    }
}
