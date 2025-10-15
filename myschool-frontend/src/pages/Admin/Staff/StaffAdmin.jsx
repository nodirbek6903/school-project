import { useState } from "react";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import StaffTable from "./StaffTable";
import StaffForm from "./StaffForm";
import StaffAccountModal from "./StaffAccountModal";
import {
  useGetStaffQuery,
  useCreateStaffMutation,
  useUpdateStaffMutation,
  useDeleteStaffMutation,
  useRegisterStaffUserMutation,
  useUpdateStaffPasswordMutation,
} from "../../../features/staff/staffApi";

const StaffAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [accountModal, setAccountModal] = useState({
    open: false,
    type: "",
    staff: null,
  });

  const { data: staffs = [], isLoading } = useGetStaffQuery();
  const [addStaff] = useCreateStaffMutation();
  const [updateStaff] = useUpdateStaffMutation();
  const [deleteStaff] = useDeleteStaffMutation();
  const [registerStaffUser] = useRegisterStaffUserMutation();
  const [updateStaffPassword] = useUpdateStaffPasswordMutation();

  const handleSubmit = async (values, editingStaff) => {
    const formData = new FormData();
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("role", values.role);
    formData.append("contact", values.contact);
    if (values.photo?.file) formData.append("photo", values.photo.file);

    try {
      if (editingStaff) {
        await updateStaff({ id: editingStaff._id, formData }).unwrap();
        message.success("Xodim yangilandi");
      } else {
        await addStaff(formData).unwrap();
        message.success("Yangi xodim qo'shildi");
      }
      setIsModalOpen(false);
    } catch {
      message.error("Xatolik: saqlab bo'lmadi");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteStaff(id).unwrap();
      message.success("O'chirildi");
    } catch {
      message.error("O'chirishda xatolik");
    }
  };

  const handleCreateAccount = async (values, staffId) => {
    try {
      await registerStaffUser({ staffId, ...values }).unwrap();
      message.success("Akkaunt yaratildi");
      setAccountModal({ open: false, type: "", staff: null });
    } catch (err) {
      message.error(err?.data?.message || "Xatolik");
    }
  };

  const handleChangePassword = async (values, userId) => {
    try {
      await updateStaffPassword({ userId, password: values.password }).unwrap();
      message.success("Parol yangilandi");
      setAccountModal({ open: false, type: "", staff: null });
    } catch {
      message.error("Parolni o'zgartirishda xatolik");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Xodimlar boshqaruvi</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingStaff(null);
            setIsModalOpen(true);
          }}
        >
          Yangi xodim
        </Button>
      </div>

      <StaffTable
        staffs={staffs}
        isLoading={isLoading}
        onEdit={(staff) => {
          setEditingStaff(staff);
          setIsModalOpen(true);
        }}
        onDelete={handleDelete}
        onAccountClick={(modalData) => setAccountModal(modalData)}
      />

      <StaffForm
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        editingStaff={editingStaff}
      />

      <StaffAccountModal
        modal={accountModal}
        onClose={() => setAccountModal({ open: false, type: "", staff: null })}
        onCreateAccount={handleCreateAccount}
        onChangePassword={handleChangePassword}
      />
    </div>
  );
};

export default StaffAdmin;
