import { Model } from "sequelize";
import { BelongsTo, Column, DataType, ForeignKey, PrimaryKey, Table } from "sequelize-typescript";
import {UserEntity}  from "../../users/entities/user.entity";
import { PatientEntity } from "src/patients/entities/patient.entity";


export enum AppointmentStatus {
    WAITING = 'WAITING',
    CALLED = 'CALLED',
    FINISHED = 'FINISHED',
}

@Table({ tableName: 'appointments', timestamps: true })
export class AppointmentEntity extends Model{
    @PrimaryKey
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, })
    declare id: string;

    @Column({ type: DataType.STRING, allowNull: false, })
    declare serviceLocation: string;

    @Column({
    type: DataType.ENUM(...Object.values(AppointmentStatus)),
    defaultValue: AppointmentStatus.WAITING,
    allowNull: false,
      })

    @Column({ type: DataType.ENUM, allowNull: false, })
    declare status: AppointmentStatus;

    @Column({ type: DataType.DATE, allowNull: true, })
    declare calledAt?: Date | null;

    @Column({ type: DataType.DATE, allowNull: true, })
    declare finishedAt?: Date | null;

    @BelongsTo(() => PatientEntity)
    @ForeignKey(() => PatientEntity)
    @Column( DataType.UUID)
    declare patientId: string;

    @BelongsTo(() => PatientEntity)
    declare patient: PatientEntity;

    @ForeignKey(() => UserEntity)
    @Column(DataType.UUID)
    declare createdByUserId: string;  

    @BelongsTo(() => UserEntity)
    declare createdByUser: UserEntity; 
}
