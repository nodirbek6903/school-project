import { useState } from "react";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TeacherTable from "./TeacherTable";
import TeacherForm from "./TeacherForm";
import TeacherAccountModal from "./TeacherAccountModal";
import {
  useGetTeachersQuery,
  useAddTeacherMutation,
  useUpdateTeacherMutation,
  useDeleteTeacherMutation,
  useRegisterTeacherUserMutation,
  useUpdateTeacherPasswordMutation,
} from "../../../features/teachers/teachersApi";

const TeachersAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [accountModal, setAccountModal] = useState({
    open: false,
    type: "",
    teacher: null,
  });

  const { data: teachers = [], isLoading } = useGetTeachersQuery();
  const [addTeacher] = useAddTeacherMutation();
  const [updateTeacher] = useUpdateTeacherMutation();
  const [deleteTeacher] = useDeleteTeacherMutation();
  const [registerTeacherUser] = useRegisterTeacherUserMutation();
  const [updateTeacherPassword] = useUpdateTeacherPasswordMutation();

  const handleSubmit = async (values, editingTeacher) => {
    const formData = new FormData();
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    values.subjects?.forEach((s) => formData.append("subjects[]", s));
    if (values.photo?.file) formData.append("photo", values.photo.file);

    try {
      if (editingTeacher) {
        await updateTeacher({ id: editingTeacher._id, formData }).unwrap();
        message.success("O'qituvchi yangilandi");
      } else {
        await addTeacher(formData).unwrap();
        message.success("Yangi o'qituvchi qo'shildi");
      }
      setIsModalOpen(false);
    } catch {
      message.error("Xatolik: saqlab bo'lmadi");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTeacher(id).unwrap();
      message.success("O'chirildi");
    } catch {
      message.error("O'chirishda xatolik");
    }
  };

  const handleCreateAccount = async (values, teacherId) => {
    try {
      await registerTeacherUser({ teacherId, ...values }).unwrap();
      message.success("Akkaunt yaratildi");
      setAccountModal({ open: false, type: "", teacher: null });
    } catch (err) {
      message.error(err?.data?.message || "Xatolik");
    }
  };

  const handleChangePassword = async (values, userId) => {
    try {
      await updateTeacherPassword({ userId, password: values.password }).unwrap();
      message.success("Parol yangilandi");
      setAccountModal({ open: false, type: "", teacher: null });
    } catch {
      message.error("Parolni o'zgartirishda xatolik");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{`O'qituvchilar boshqaruvi`}</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingTeacher(null);
            setIsModalOpen(true);
          }}
        >
          {`Yangi o'qituvchi`}
        </Button>
      </div>

      <TeacherTable
        teachers={teachers}
        isLoading={isLoading}
        onEdit={(teacher) => {
          setEditingTeacher(teacher);
          setIsModalOpen(true);
        }}
        onDelete={handleDelete}
        onAccountClick={(modalData) => setAccountModal(modalData)}
      />

      <TeacherForm
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        editingTeacher={editingTeacher}
      />

      <TeacherAccountModal
        modal={accountModal}
        onClose={() => setAccountModal({ open: false, type: "", teacher: null })}
        onCreateAccount={handleCreateAccount}
        onChangePassword={handleChangePassword}
      />
    </div>
  );
};

export default TeachersAdmin;
