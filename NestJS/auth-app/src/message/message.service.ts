import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateMessageDTO } from './dto/createMessage.dto';

@Injectable()
export class MessageService {
    constructor(private dataSource: DataSource){}

    // POST - Create message
    async createMessage(messageDTO: CreateMessageDTO ){
        const { fname, lname, number, email, text, isagree } = messageDTO
        const query = `
        INSERT INTO message (fname, lname, number, email, text, isagree)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `;

        const values = [fname, lname, number, email, text, isagree]; 
        const result = await this.dataSource.query(query, values);

        return result[0]
        
    }

    // GET - Get All Messages
    async getMessages() {
        const query = `
        SELECT * FROM message;
        `;

        return await this.dataSource.query(query)
    }

    // GET - get message by id
    async getMessageById(id: number){
        const query = `
        SELECT * FROM message WHERE id = ${id};
        `
        const result = await this.dataSource.query(query);
        return result[0]
    }

}
