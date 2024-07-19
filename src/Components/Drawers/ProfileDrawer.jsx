import { Drawer, Space } from 'antd';
import React, { useState } from 'react';
import { Button, Input } from 'antd';
import styled from '@emotion/styled';
import { EditOutlined } from '@ant-design/icons';
import UpdateProfile from '../Profile/UpdateProfile';
import ProfileInfo from '../Profile/ProfileInfo';

function ProfileDrawer({ drawer, onClose }) {

  const [edit, setEdit] = useState(false);
  const { data, open } = drawer;

  return (
    <div>
        <Drawer
            title={`${edit ? 'Update' : ''} Profile Details`}
            placement={'right'}
            width={650}
            onClose={() => { onClose(); setEdit(false)}}
            open={open}
            extra={
              !edit && 
              <Space>
                <EditButton onClick={() => setEdit(true)}>
                  Edit
                  <EditOutlined />
                </EditButton>
              </Space>
            }
        >
          {
            edit ?
            <UpdateProfile
              edit={edit}
              setEdit={setEdit}
              data={data} 
            />
            : <ProfileInfo 
                data={data} 
              />
          }
            
        </Drawer>
    </div>
  )
}

export default ProfileDrawer;

const EditButton = styled(Button)(() => ({
  width: '100%',
  height: '40px',
  backgroundColor: '#0047ab',
  color: 'white',
  '&:hover': {
    backgroundColor: '#003580 !important',
    outlineColor: '#003580 !important',
    color: 'white !important'
  }
}));