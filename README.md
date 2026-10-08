- controller : itu isinya adalah request untuk handler webnya, dari controller ini dia hanya akan menerima request, cuma menerima request lalu mengirimkan datanya ke service, juga menerima data dari sevicenya lalu dikembalikan lagi ke respon webnya. jadi isi controller simple banget
- service : layer untuk bisnis logic, seperti logic ke database dll itu disimpan di service ini
- model : pertukaran data dari yang dikirim oleh request dan juga response (itukan nanti ada datanya) nah itu disimpan datanya dalam bentuk model, jadi nanti request dan response agar lebih rapi itu didefinisikan di model
  saat model itu kita kirimkan ke service misalnya, contohnya registrasi, login dll itukan perlu dilakukan sebuah validasi
- validation : validasi data, aturan validasi
- middleware digunakan untuk menerima data tokennya yang dikirim sesuai dengan api user spec
