import Navbar from "../../Components/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../Components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "../../Components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../Components/ui/table";
import { Badge } from "../../Components/ui/badge";
import {
  Search,
  Plus,
  User,
  ChefHat,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { createPatient, getPantryStaff, getPatients } from "../api";
import { PantryStaffType, PatientType } from "../../utils/typeDefinition";
import PatientModal from "../../Components/Patient/PatientModal";
import { toast } from "react-toastify";

interface propsType {
  isLoggedIn: boolean;
  setIsLoggedIn: (arg0: boolean) => void;
}

const Dashboard: React.FC<propsType> = ({ isLoggedIn, setIsLoggedIn }) => {
  const [patients, setPatients] = useState<PatientType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [pantryStaff, setPantryStaff] = useState([]);

  const getStatusBadge = (status) => {
    const colors = {
      Delivered: "bg-green-500",
      Preparing: "bg-yellow-500",
      Pending: "bg-gray-500",
    };
    return <Badge className={`${colors[status]} text-white`}>{status}</Badge>;
  };

  const handleCreatePatient= async (data:PatientType) =>{
    const response = await createPatient(data);
    if(response?.success){
      toast.success("Successfully Created User");
      setPatients((prev)=> [...prev, response.data]);
    }
    toast.info(response?.message);
  }
  useEffect(()=>{
    async function fetchData() {
      const response = await getPatients();
      if(response?.success){
        // console.log(response)
        setPatients(response?.data);
      }
    }
    fetchData();
  },[setPatients])
  useEffect(()=>{
    async function fetchData() {
      const response = await getPantryStaff();
      if(response?.success){
        // console.log(response)
        setPantryStaff(response?.data);
      }
    }
    fetchData();
  },[setPantryStaff])
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="p-4 max-w-7xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold mb-6">
          Hospital Food Management Dashboard
        </h1>

        <Tabs defaultValue="patients" className="w-full">
          <TabsList>
            <TabsTrigger value="patients">
              <User className="w-4 h-4 mr-2" />
              Patients
            </TabsTrigger>
            <TabsTrigger value="meals">
              <Calendar className="w-4 h-4 mr-2" />
              Meal Tracking
            </TabsTrigger>
            <TabsTrigger value="pantry">
              <ChefHat className="w-4 h-4 mr-2" />
              Pantry Management
            </TabsTrigger>
          </TabsList>

          {/* Patients Tab */}
          <TabsContent value="patients">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Patient Management</span>
                  <div className="flex space-x-2">
                    <button className="p-2 rounded-full hover:bg-gray-100">
                      <Search className="w-5 h-5" />
                    </button>
                    <button onClick={()=>setIsModalOpen(true)} className="p-2 rounded-full hover:bg-gray-100">
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Room/Bed</TableHead>
                      <TableHead>Dietary Restrictions</TableHead>
                      <TableHead>Allergies</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patients?.map((patient:PatientType) => (
                      <TableRow key={patient.id}>
                        <TableCell className="font-medium">
                          {patient.name}
                        </TableCell>
                        <TableCell>{`${patient.roomNumber}-${patient.bedNumber}`}</TableCell>
                        {/* <TableCell>{patient.dietaryRestrictions}</TableCell> */}
                        <TableCell>{patient.allergies.join(", ")}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-500 text-white">
                            Active
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pantry Management Tab */}
          <TabsContent value="pantry">
            <Card>
              <CardHeader>
                <CardTitle>Pantry Staff & Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Staff Name</TableHead>
                      <TableHead>Pantry Name</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Current Task</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pantryStaff.map((staff:any) => (
                      <TableRow key={staff?.id}>
                        <TableCell className="font-medium">
                          {staff?.name}
                        </TableCell>
                        <TableCell>{staff?.Pantry?.location || "none"}</TableCell>
                        <TableCell>{staff?.Pantry?.name || "none"}</TableCell>
                        <TableCell>{staff?.assignedTasks[0]?.meal?.mealType} Meal</TableCell>
                        <TableCell>
                          <Badge className="bg-green-500 text-white">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            {staff?.assignedTasks[0]?.status || "NOT_ASSIGNED"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <PatientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreatePatient}
      />
      </div>
    </>
  );
};

export default Dashboard;
