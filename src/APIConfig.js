const config = {
    "swagger": "2.0",
    "info": {
        "description": "API Doccument By Swagger. จัดทำหน้านี้ขึ้นเพื่อรวบรวม API ที่ใช้นเว็บไซต์นี้",
        "title": "Swagger Numerical Method"
    }
    ,
    "host": "my-json-server.typicode.com/donut1531/Numerical-Method"
    ,
    "path": {
        "/root_of_equation": {
            "get": {
                "tags": [
                    "API"
                ]
                ,
                "summary": "ค้นหาโจทย์ทั้งหมดในเรื่อง Root of Equation"
                ,
                "responses": {
                    "200": {
                        "description": "ทำงานสำเร็จ"
                    }
                    ,
                    "400": {
                        "description": "ทำงานไม่สำเร็จ"
                    }
                }
            }
        }
        ,
        "/root_of_equation/{ExampleID}": {
            "get": {
                "tag": [
                    "API"
                ],
                "summary": "ระบุหมายเลขโจทย์ในเรื่อง Root of Equation"
                ,
                "parameters": [
                    {
                        "name": "ExampleId",
                        "in": "path",
                        "description": "หมายเลขไอดีของโจทย์ตัวอย่างที่จะค้นหา",
                        "required": true,
                        "type": "integer",
                        "format": "int64"
                    }
                ]
                ,
                "response": {
                    "200": {
                        "description": "ค้นพบโจทย์"
                    }
                    ,
                    "404": {
                        "description": "ไม่พบโจทย์"
                    }
                }

            }
        }
        ,
        "/matrix": {
            "get": {
                "tags": [
                    "API"
                ],
                "summary": "ค้นหาโจทย์ทั้งหมดในเรื่อง Matrix",
                "responses": {
                    "200": {
                        "description": "ทำงานสำเร็จ"
                    },
                    "404": {
                        "description": "ไม่พบโจทย์"
                    }
                }
            }
        },
        "/matrix/{ExampleId}": {
            "get": {
                "tags": [
                    "API"
                ],
                "summary": "ระบุหมายเลขโจทย์ในเรื่อง Matrix",
                "parameters": [
                    {
                        "name": "ExampleId",
                        "in": "path",
                        "description": "หมายเลขไอดีของโจทย์ตัวอย่าง",
                        "required": true,
                        "type": "integer",
                        "format": "int64"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "ทำงานสำเร็จ"
                    },
                    "404": {
                        "description": "ไม่พบโจทย์"
                    }
                }
            }
        }
    }
}

export { config }