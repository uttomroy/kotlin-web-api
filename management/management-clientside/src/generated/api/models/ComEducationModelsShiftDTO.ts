/* tslint:disable */
/* eslint-disable */
/**
 * Management API
 * Management System API Documentation
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: support@example.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface ComEducationModelsShiftDTO
 */
export interface ComEducationModelsShiftDTO {
    /**
     * 
     * @type {string}
     * @memberof ComEducationModelsShiftDTO
     */
    description?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ComEducationModelsShiftDTO
     */
    endTime: string;
    /**
     * 
     * @type {number}
     * @memberof ComEducationModelsShiftDTO
     */
    organizationId: number;
    /**
     * 
     * @type {number}
     * @memberof ComEducationModelsShiftDTO
     */
    shiftId: number;
    /**
     * 
     * @type {string}
     * @memberof ComEducationModelsShiftDTO
     */
    shiftName: string;
    /**
     * 
     * @type {string}
     * @memberof ComEducationModelsShiftDTO
     */
    startTime: string;
}

/**
 * Check if a given object implements the ComEducationModelsShiftDTO interface.
 */
export function instanceOfComEducationModelsShiftDTO(value: object): value is ComEducationModelsShiftDTO {
    if (!('endTime' in value) || value['endTime'] === undefined) return false;
    if (!('organizationId' in value) || value['organizationId'] === undefined) return false;
    if (!('shiftId' in value) || value['shiftId'] === undefined) return false;
    if (!('shiftName' in value) || value['shiftName'] === undefined) return false;
    if (!('startTime' in value) || value['startTime'] === undefined) return false;
    return true;
}

export function ComEducationModelsShiftDTOFromJSON(json: any): ComEducationModelsShiftDTO {
    return ComEducationModelsShiftDTOFromJSONTyped(json, false);
}

export function ComEducationModelsShiftDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): ComEducationModelsShiftDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'description': json['description'] == null ? undefined : json['description'],
        'endTime': json['endTime'],
        'organizationId': json['organizationId'],
        'shiftId': json['shiftId'],
        'shiftName': json['shiftName'],
        'startTime': json['startTime'],
    };
}

export function ComEducationModelsShiftDTOToJSON(json: any): ComEducationModelsShiftDTO {
    return ComEducationModelsShiftDTOToJSONTyped(json, false);
}

export function ComEducationModelsShiftDTOToJSONTyped(value?: ComEducationModelsShiftDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'description': value['description'],
        'endTime': value['endTime'],
        'organizationId': value['organizationId'],
        'shiftId': value['shiftId'],
        'shiftName': value['shiftName'],
        'startTime': value['startTime'],
    };
}

