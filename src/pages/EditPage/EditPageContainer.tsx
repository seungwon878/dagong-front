import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditPagePresentation from './EditPagePresentation';

const EditPageContainer = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    address: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleTogglePassword = () => setShowPassword((prev) => !prev);
  const handleEdit = () => {
    // 저장 로직 (추후 구현)
    alert('수정 완료!');
    navigate('/mypage');
  };
  const handleCancel = () => navigate('/mypage');

  return (
    <EditPagePresentation
      email={form.email}
      username={form.username}
      password={form.password}
      address={form.address}
      showPassword={showPassword}
      onChange={handleChange}
      onTogglePassword={handleTogglePassword}
      onEdit={handleEdit}
      onCancel={handleCancel}
    />
  );
};

export default EditPageContainer;
