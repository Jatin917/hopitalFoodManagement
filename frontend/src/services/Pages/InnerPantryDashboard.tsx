/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../Components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../../Components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../Components/ui/table';
import { Badge } from '../../Components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../Components/ui/select';
import { Clock, Truck, ChefHat, CheckCircle, Box } from 'lucide-react';
import Navbar from '../../Components/Navbar/Navbar';
import { getDeliveryPerson, getPantryTaskStaff } from '../api';
import { toast } from 'react-toastify';
import { pantryTaskType } from '../../utils/typeDefinition';


interface propsType {
    isLoggedIn: boolean;
    setIsLoggedIn: (arg0: boolean) => void;
  }

const InnerPantryDashboard:React.FC<propsType> = ({isLoggedIn, setIsLoggedIn}) => {
  // Sample data - in a real app, this would come from an API
  const [preparationTasks, setPreparationTasks] = useState([]);

  const [deliveryStaff, setDeliveryStaff] = useState([]);

  const [mealBoxes] = useState([
    {
      id: 1,
      patientName: "John Doe",
      roomNumber: "201",
      mealType: "Lunch",
      dietDetails: "Low sodium, No dairy",
      status: "Ready for Delivery",
      assignedDriver: "Tom Wilson",
      preparationTime: "11:30 AM",
      deliveryTime: "12:00 PM"
    }
  ]);

  const getStatusBadge = (status: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined) => {
    const statusColors = {
      "In Progress": "bg-yellow-500",
      "Completed": "bg-green-500",
      "Ready for Delivery": "bg-blue-500",
      "Delivered": "bg-green-500",
      "Available": "bg-green-500",
      "On Delivery": "bg-yellow-500"
    };
    return (
        // @ts-ignore
      <Badge className={`${statusColors[status]} text-white`}>
        {status}
      </Badge>
    );
  };

  useEffect(()=>{
    async function fetchData(){
        const response = await getPantryTaskStaff();
        if(response.success){
            setPreparationTasks(response.data);
        }
        toast.info(response.message);
    } 
    fetchData();
  },[])
  useEffect(()=>{
    async function fetchData(){
        const response = await getDeliveryPerson();
        if(response.success){
            setDeliveryStaff(response.data);
        }
        toast.info(response.message);
    } 
    fetchData();
  },[])
    function task(value: never, index: number, array: never[]): ReactNode {
        throw new Error('Function not implemented.');
    }

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    <div className="p-4 max-w-7xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold mb-6">Inner Pantry Dashboard</h1>
      
      <Tabs defaultValue="preparation" className="w-full">
        <TabsList>
          <TabsTrigger value="preparation">
            <ChefHat className="w-4 h-4 mr-2" />
            Meal Preparation
          </TabsTrigger>
          <TabsTrigger value="delivery-staff">
            <Truck className="w-4 h-4 mr-2" />
            Delivery Staff
          </TabsTrigger>
          <TabsTrigger value="meal-tracking">
            <Box className="w-4 h-4 mr-2" />
            Meal Box Tracking
          </TabsTrigger>
        </TabsList>

        {/* Meal Preparation Tab */}
        <TabsContent value="preparation">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Current Preparation Tasks</span>
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Meal Type</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Pantry</TableHead>
                    <TableHead>Assigned At</TableHead>
                    <TableHead>Status</TableHead>
                    {/* <TableHead>Delivery Time</TableHead> */}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {preparationTasks?.map((task:pantryTaskType) => (
                    <TableRow key={task?.id}>
                      <TableCell>{task?.meal?.mealType}</TableCell>
                      <TableCell>{task?.staff?.name}</TableCell>
                      {/* <TableCell>
                        <div>{task.patientName}</div>
                        <div className="text-sm text-gray-500">Room {task.roomNumber}</div>
                      </TableCell> */}
                      <TableCell>{task.staff?.Pantry.name}</TableCell>
                      <TableCell>{task?.updatedAt}</TableCell>
                      <TableCell>{getStatusBadge(task.status)}</TableCell>
                      {/* <TableCell>
                        <Clock className="w-4 h-4 inline mr-1" />
                        {task.deliveryTime}
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Delivery Staff Tab */}
        <TabsContent value="delivery-staff">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Personnel Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    {/* <TableHead>Zone</TableHead> */}
                    <TableHead>Current Deliveries</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deliveryStaff.map((staff:any) => (
                    <TableRow key={staff.id}>
                      <TableCell className="font-medium">{staff.name}</TableCell>
                      <TableCell>{staff.contactInfo || "NA"}</TableCell>
                      {/* <TableCell>{staff.zone}</TableCell> */}
                      <TableCell>{staff.deliveryTasks.length}</TableCell>
                      <TableCell>{getStatusBadge(staff.deliveryTasks[0]?.status)}</TableCell>
                      <TableCell>
                        <Select defaultValue="assign">
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Assign Task" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="assign">Assign Meal Box</SelectItem>
                            <SelectItem value="update">Update Status</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Meal Box Tracking Tab */}
        <TabsContent value="meal-tracking">
          <Card>
            <CardHeader>
              <CardTitle>Meal Box Delivery Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient Details</TableHead>
                    <TableHead>Meal Info</TableHead>
                    <TableHead>Assigned Driver</TableHead>
                    <TableHead>Preparation Time</TableHead>
                    <TableHead>Delivery Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mealBoxes.map(box => (
                    <TableRow key={box.id}>
                      <TableCell>
                        <div>{box.patientName}</div>
                        <div className="text-sm text-gray-500">Room {box.roomNumber}</div>
                      </TableCell>
                      <TableCell>
                        <div>{box.mealType}</div>
                        <div className="text-sm text-gray-500">{box.dietDetails}</div>
                      </TableCell>
                      <TableCell>{box.assignedDriver}</TableCell>
                      <TableCell>{box.preparationTime}</TableCell>
                      <TableCell>{box.deliveryTime}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(box.status)}
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </>
  );
};

export default InnerPantryDashboard;