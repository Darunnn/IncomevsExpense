export const localStorageSpaceCheck = () => {
    const maxStorage = 5 * 1024 * 1024; 
    let total = 0;
    const keys = Object.keys(localStorage);
    for (let key of keys) {
        let value = localStorage.getItem(key);
        if (value !== null) {
            total += key.length + value.length;
        }
    }
    const remainingSpace = maxStorage - total;
    return {
        total,
        remainingSpace
    };
};

export const logLocalStorageInfo = () => {
    const { total, remainingSpace } = localStorageSpaceCheck();
    console.log(`พื้นที่ที่ใช้ไป: ${total} bytes`);
    console.log(`พื้นที่ที่สามารถเก็บข้อมูลเพิ่มได้: ${remainingSpace} bytes`);
};


