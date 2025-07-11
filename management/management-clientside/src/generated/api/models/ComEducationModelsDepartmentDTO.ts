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
 * @interface ComEducationModelsDepartmentDTO
 */
export interface ComEducationModelsDepartmentDTO {
    /**
     * 
     * @type {string}
     * @memberof ComEducationModelsDepartmentDTO
     */
    description?: string | null;
    /**
     * 
     * @type {number}
     * @memberof ComEducationModelsDepartmentDTO
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof ComEducationModelsDepartmentDTO
     */
    name: string;
    /**
     * 
     * @type {number}
     * @memberof ComEducationModelsDepartmentDTO
     */
    organizationId: number;
}

/**
 * Check if a given object implements the ComEducationModelsDepartmentDTO interface.
 */
export function instanceOfComEducationModelsDepartmentDTO(value: object): value is ComEducationModelsDepartmentDTO {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('organizationId' in value) || value['organizationId'] === undefined) return false;
    return true;
}

export function ComEducationModelsDepartmentDTOFromJSON(json: any): ComEducationModelsDepartmentDTO {
    return ComEducationModelsDepartmentDTOFromJSONTyped(json, false);
}

export function ComEducationModelsDepartmentDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): ComEducationModelsDepartmentDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'description': json['description'] == null ? undefined : json['description'],
        'id': json['id'],
        'name': json['name'],
        'organizationId': json['organizationId'],
    };
}

export function ComEducationModelsDepartmentDTOToJSON(json: any): ComEducationModelsDepartmentDTO {
    return ComEducationModelsDepartmentDTOToJSONTyped(json, false);
}

export function ComEducationModelsDepartmentDTOToJSONTyped(value?: ComEducationModelsDepartmentDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'description': value['description'],
        'id': value['id'],
        'name': value['name'],
        'organizationId': value['organizationId'],
    };
}

