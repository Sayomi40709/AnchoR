const { Schema, model } = require('mongoose');

// สร้าง schema สำหรับเก็บข้อมูลบทบาทของสมาชิก
const roleSchema = new Schema({
  userId: { type: String, required: true },
  roles: { type: [String], required: true },
  guildId: { type: String, required: true }, // เพิ่ม field สำหรับเก็บ ID ของกิล
  leftAt: { type: Date, required: true, default: Date.now } // เพิ่ม field สำหรับเก็บวันที่ออกจากกิล
});

// สร้าง model สำหรับ collection ที่เก็บข้อมูลบทบาท
const Role = model('Role', roleSchema);

module.exports = Role;
