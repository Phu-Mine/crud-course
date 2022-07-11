import { Transfer, Tag } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

// import { updateRegister } from '../../redux/actions'

const ClassDetail = ({ course, listStudent }) => {

    const [targetKeys, setTargetKeys] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/registrations/${course.key}/students`)
            .then(response => {
                setTargetKeys(response.data);
            })
    }, [course.key])

    const customTitles = [
        ({ selectedCount, totalCount }) => (
            <span>
                {selectedCount}/{totalCount}
                {' Sinh viên'}
            </span>
        ),
        ({ selectedCount, totalCount }) => (
            <span>
                {selectedCount}/{totalCount}
                {' Sinh viên'}
            </span>
        )
    ]
    const itemRenderer = (item) => (<>
        <b>{item.name}</b>
        <i> ({item.birthday})</i>
        <Tag color="volcano" style={{ float: 'right' }}>
            {item.specialized}
        </Tag>
    </>
    )

    const searchOption = (inputValue, option) => option.name.toLowerCase().indexOf(inputValue) > -1 || option.specialized.indexOf(inputValue.toUpperCase()) > -1;
    const handleChange = newTargetKeys => {
        setTargetKeys(newTargetKeys);

        axios.post(`http://localhost:8080/registrations/${course.key}`, newTargetKeys)
            .then(res => {
                console.log(res.data)
                console.log(`http://localhost:8080/registrations/${course.key}`);
                console.log(targetKeys);
            })
    };

    return (
        <>
            <Transfer
                showSearch
                dataSource={listStudent}
                render={itemRenderer}
                targetKeys={targetKeys}
                onChange={handleChange}
                filterOption={searchOption}
                selectAllLabels={customTitles} //chỉnh sửa span title cho 2 list
                titles={['Chưa đăng ký', 'Đã đăng ký']}
                operations={['Đăng ký học', 'Huỷ đăng ký']}
                listStyle={{ width: '50vw', height: '60vh', }}
            />
        </>
    );
}

export default ClassDetail;