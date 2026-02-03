# Thiet ke Chi tiet Co so du lieu: Pet Grooming V2

Tai lieu nay cung cap cau truc Schema chi tiet cho he thong MongoDB, duoc thiet ke de ho tro dong thoi cac nghiep vu dat lich, thanh toan va cac tinh nang AI.

---

## 1. Collection: Users
Luu tru thong tin nguoi dung va quan ly xac thuc.

```json
{
  "_id": "ObjectId",
  "email": "string (unique)",
  "password": "string (hashed)",
  "name": "string",
  "phone": "string",
  "role": "enum ['user', 'admin']",
  "avatarUrl": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

---

## 2. Collection: Pets
Luu tru ho so thu cung va ket qua phan tich tu AI.

```json
{
  "_id": "ObjectId",
  "ownerId": "ObjectId (ref: Users)",
  "name": "string",
  "type": "enum ['dog', 'cat', 'other']",
  "breed": {
    "detectedByAI": "string", 
    "confidenceScore": "float",
    "confirmedByUser": "string"
  },
  "age": "number",
  "weight": "float",
  "photoUrl": "string",
  "medicalHistory": "string",
  "createdAt": "date"
}
```

---

## 3. Collection: Services
Danh muc cac dich vu cham soc thu cung.

```json
{
  "_id": "ObjectId",
  "name": "string",
  "description": "string",
  "basePrice": "decimal",
  "durationMinutes": "number",
  "category": "enum ['grooming', 'bath', 'spa', 'healthcare']",
  "isActive": "boolean"
}
```

---

## 4. Collection: Appointments
Thuc the trung tam quan ly quy trinh dat lich. Su dung ky thuat Embedding de luu snapshot thong tin tai thoi diem dat.

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (ref: Users)",
  "petId": "ObjectId (ref: Pets)",
  "petSnapshot": {
    "name": "string",
    "breed": "string"
  },
  "serviceId": "ObjectId (ref: Services)",
  "serviceSnapshot": {
    "name": "string",
    "price": "decimal"
  },
  "appointmentDate": "date",
  "startTime": "string",
  "status": "enum ['pending', 'confirmed', 'completed', 'cancelled']",
  "notes": "string",
  "paymentStatus": "enum ['unpaid', 'paid', 'refunded']",
  "createdAt": "date"
}
```

---

## 5. Collection: Payments
Luu tru lich su giao dich va tich hop cong thanh toan.

```json
{
  "_id": "ObjectId",
  "appointmentId": "ObjectId (ref: Appointments)",
  "userId": "ObjectId (ref: Users)",
  "amount": "decimal",
  " метод": "enum ['stripe', 'paypal', 'momo']",
  "transactionId": "string",
  "status": "enum ['pending', 'success', 'failed']",
  "timestamp": "date"
}
```

---

## 6. Collection: Chat_Logs
Luu tru lich su tu van cua Chatbot Gemini de toi uu hoa Prompt va ho tro nguoi dung.

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (ref: Users)",
  "sessionId": "string",
  "messages": [
    {
      "role": "enum ['user', 'assistant']",
      "content": "string",
      "timestamp": "date"
    }
  ],
  "lastInteracted": "date"
}
```

---

## Ghi chu ve Kien truc (Architectural Notes)
1. **Tinh Toan ven:** Su dung `petSnapshot` va `serviceSnapshot` trong Appointment de dam bao rang neu User xoa thu cung hoac cua hang thay doi gia dich vu, cac don hang cu van giu nguyen thong tin lich su.
2. **Toi uu AI:** Collection `Pets` luu tru ca kieu `detectedByAI` va `confirmedByUser` de cung cap du lieu cho viec danh gia do chinh xac cua model TensorFlow.js.
3. **Bao mat:** Mat khau trong `Users` phai duoc hash bang bcrypt truoc khi luu. Thong tin giao dich trong `Payments` phai duoc doi xieu thong qua Webhook tu nha cung cap thanh toan.
