
import { Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";


@Table({ tableName: 'patients', timestamps:true})

export class PatientEntity extends Model {
    @PrimaryKey
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, })
    declare id: string;

    @Column({ type: DataType.STRING, allowNull: false, })
    declare name: string;

    @Column({ type: DataType.STRING, allowNull: false,})
    declare InsuranceCardNumber:string;
    
    @Column({type: DataType.STRING, allowNull: false,})
    declare insurancePlanName:string;
    
    @Column({type: DataType.DATEONLY, allowNull: true,})
    declare cardExpirationDate: Date | null;


    @Column({type: DataType.STRING, allowNull: true,})
    declare phone: string | null;

    @Column({type: DataType.DATEONLY, allowNull: true,})
    declare birthdate?: Date;

    @HasMany(() => AppointmentEntity)
    declare appointments: AppointmentEntity[];

}
