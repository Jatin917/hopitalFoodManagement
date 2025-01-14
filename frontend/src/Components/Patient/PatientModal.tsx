import React, { useState } from 'react';
import { GenderEnumTs, PatientType } from '../../utils/typeDefinition';

interface PatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (patient: PatientType) => void;
}


const PatientModal: React.FC<PatientModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<PatientType>({
    name: '',
    diseases: [],
    allergies: [],
    roomNumber: '',
    bedNumber: '',
    floorNumber: 0,
    age: 0,
    gender: GenderEnumTs.MALE,
    contactInfo: '',
    emergencyContact: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'age' || name === 'floorNumber' ? Number(value) : value,
    }));
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof PatientType) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: value.split(',').map((item) => item.trim()),
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Add Patient Details</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="diseases"
            placeholder="Diseases (comma-separated)"
            value={formData.diseases.join(', ')}
            onChange={(e) => handleArrayChange(e, 'diseases')}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="allergies"
            placeholder="Allergies (comma-separated)"
            value={formData.allergies.join(', ')}
            onChange={(e) => handleArrayChange(e, 'allergies')}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="roomNumber"
            placeholder="Room Number"
            value={formData.roomNumber}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="bedNumber"
            placeholder="Bed Number"
            value={formData.bedNumber}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            name="floorNumber"
            placeholder="Floor Number"
            value={formData.floorNumber}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          >
            <option value={GenderEnumTs.MALE}>Male</option>
            <option value={GenderEnumTs.FEMALE}>Female</option>
            <option value={GenderEnumTs.OTHER}>Other</option>
          </select>
          <input
            type="text"
            name="contactInfo"
            placeholder="Contact Info"
            value={formData.contactInfo}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="emergencyContact"
            placeholder="Emergency Contact"
            value={formData.emergencyContact}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="flex justify-end space-x-4 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientModal;
