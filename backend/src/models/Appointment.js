import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Appointment = sequelize.define("Appointment",{
  id:{type:DataTypes.UUID,defaultValue:DataTypes.UUIDV4,primaryKey:true},
  user_id:DataTypes.UUID,
  pet_id:DataTypes.UUID,
  service_id:DataTypes.UUID,
  appointment_time:DataTypes.DATE,
  status:DataTypes.STRING,
  notes:DataTypes.TEXT
},{
  tableName:"appointments",
  timestamps:true,
  createdAt:"created_at",
  updatedAt:false
});

export default Appointment;