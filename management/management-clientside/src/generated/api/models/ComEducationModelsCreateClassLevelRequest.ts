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
 * @interface ComEducationModelsCreateClassLevelRequest
 */
export interface ComEducationModelsCreateClassLevelRequest {
    /**
     * 
     * @type {string}
     * @memberof ComEducationModelsCreateClassLevelRequest
     */
    name: string;
    /**
     * 
     * @type {number}
     * @memberof ComEducationModelsCreateClassLevelRequest
     */
    organizationId: number;
}

/**
 * Check if a given object implements the ComEducationModelsCreateClassLevelRequest interface.
 */
export function instanceOfComEducationModelsCreateClassLevelRequest(value: object): value is ComEducationModelsCreateClassLevelRequest {
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('organizationId' in value) || value['organizationId'] === undefined) return false;
    return true;
}

export function ComEducationModelsCreateClassLevelRequestFromJSON(json: any): ComEducationModelsCreateClassLevelRequest {
    return ComEducationModelsCreateClassLevelRequestFromJSONTyped(json, false);
}

export function ComEducationModelsCreateClassLevelRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): ComEducationModelsCreateClassLevelRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'name': json['name'],
        'organizationId': json['organizationId'],
    };
}

export function ComEducationModelsCreateClassLevelRequestToJSON(json: any): ComEducationModelsCreateClassLevelRequest {
    return ComEducationModelsCreateClassLevelRequestToJSONTyped(json, false);
}

export function ComEducationModelsCreateClassLevelRequestToJSONTyped(value?: ComEducationModelsCreateClassLevelRequest | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'name': value['name'],
        'organizationId': value['organizationId'],
    };
}

