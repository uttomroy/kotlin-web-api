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


import * as runtime from '../runtime';
import type {
  ComEducationModelsClassLevelDAO,
  ComEducationModelsClassLevelDTO,
  ComEducationModelsCreateClassLevelRequest,
  ComEducationModelsUpdateClassLevelRequest,
} from '../models/index';
import {
    ComEducationModelsClassLevelDAOFromJSON,
    ComEducationModelsClassLevelDAOToJSON,
    ComEducationModelsClassLevelDTOFromJSON,
    ComEducationModelsClassLevelDTOToJSON,
    ComEducationModelsCreateClassLevelRequestFromJSON,
    ComEducationModelsCreateClassLevelRequestToJSON,
    ComEducationModelsUpdateClassLevelRequestFromJSON,
    ComEducationModelsUpdateClassLevelRequestToJSON,
} from '../models/index';

export interface CreateClassLevelRequest {
    orgId: number;
    comEducationModelsCreateClassLevelRequest: ComEducationModelsCreateClassLevelRequest;
}

export interface DeleteClassLevelRequest {
    orgId: number;
    classLevelId: number;
}

export interface GetClassLevelByIdRequest {
    orgId: number;
    classLevelId: number;
}

export interface GetClassLevelsRequest {
    orgId: number;
}

export interface UpdateClassLevelRequest {
    orgId: number;
    classLevelId: number;
    comEducationModelsUpdateClassLevelRequest: ComEducationModelsUpdateClassLevelRequest;
}

/**
 * 
 */
export class ClassLevelApi extends runtime.BaseAPI {

    /**
     * Creates a new class level
     * Create new class level
     */
    async createClassLevelRaw(requestParameters: CreateClassLevelRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<{ [key: string]: number; }>> {
        if (requestParameters['orgId'] == null) {
            throw new runtime.RequiredError(
                'orgId',
                'Required parameter "orgId" was null or undefined when calling createClassLevel().'
            );
        }

        if (requestParameters['comEducationModelsCreateClassLevelRequest'] == null) {
            throw new runtime.RequiredError(
                'comEducationModelsCreateClassLevelRequest',
                'Required parameter "comEducationModelsCreateClassLevelRequest" was null or undefined when calling createClassLevel().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/orgs/{orgId}/class-levels`.replace(`{${"orgId"}}`, encodeURIComponent(String(requestParameters['orgId']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ComEducationModelsCreateClassLevelRequestToJSON(requestParameters['comEducationModelsCreateClassLevelRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Creates a new class level
     * Create new class level
     */
    async createClassLevel(requestParameters: CreateClassLevelRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<{ [key: string]: number; }> {
        const response = await this.createClassLevelRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Deletes an existing class level
     * Delete class level
     */
    async deleteClassLevelRaw(requestParameters: DeleteClassLevelRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<{ [key: string]: string; }>> {
        if (requestParameters['orgId'] == null) {
            throw new runtime.RequiredError(
                'orgId',
                'Required parameter "orgId" was null or undefined when calling deleteClassLevel().'
            );
        }

        if (requestParameters['classLevelId'] == null) {
            throw new runtime.RequiredError(
                'classLevelId',
                'Required parameter "classLevelId" was null or undefined when calling deleteClassLevel().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/orgs/{orgId}/class-levels/{classLevelId}`.replace(`{${"orgId"}}`, encodeURIComponent(String(requestParameters['orgId']))).replace(`{${"classLevelId"}}`, encodeURIComponent(String(requestParameters['classLevelId']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Deletes an existing class level
     * Delete class level
     */
    async deleteClassLevel(requestParameters: DeleteClassLevelRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<{ [key: string]: string; }> {
        const response = await this.deleteClassLevelRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get a specific class level by its ID
     * Get Class Level by ID
     */
    async getClassLevelByIdRaw(requestParameters: GetClassLevelByIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ComEducationModelsClassLevelDAO>> {
        if (requestParameters['orgId'] == null) {
            throw new runtime.RequiredError(
                'orgId',
                'Required parameter "orgId" was null or undefined when calling getClassLevelById().'
            );
        }

        if (requestParameters['classLevelId'] == null) {
            throw new runtime.RequiredError(
                'classLevelId',
                'Required parameter "classLevelId" was null or undefined when calling getClassLevelById().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/orgs/{orgId}/class-levels/{classLevelId}`.replace(`{${"orgId"}}`, encodeURIComponent(String(requestParameters['orgId']))).replace(`{${"classLevelId"}}`, encodeURIComponent(String(requestParameters['classLevelId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ComEducationModelsClassLevelDAOFromJSON(jsonValue));
    }

    /**
     * Get a specific class level by its ID
     * Get Class Level by ID
     */
    async getClassLevelById(requestParameters: GetClassLevelByIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ComEducationModelsClassLevelDAO> {
        const response = await this.getClassLevelByIdRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get all class levels in the organization
     * Get Class Level list
     */
    async getClassLevelsRaw(requestParameters: GetClassLevelsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<ComEducationModelsClassLevelDTO>>> {
        if (requestParameters['orgId'] == null) {
            throw new runtime.RequiredError(
                'orgId',
                'Required parameter "orgId" was null or undefined when calling getClassLevels().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/orgs/{orgId}/class-levels`.replace(`{${"orgId"}}`, encodeURIComponent(String(requestParameters['orgId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ComEducationModelsClassLevelDTOFromJSON));
    }

    /**
     * Get all class levels in the organization
     * Get Class Level list
     */
    async getClassLevels(requestParameters: GetClassLevelsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<ComEducationModelsClassLevelDTO>> {
        const response = await this.getClassLevelsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Updates the information of an existing class level
     * Update class level information
     */
    async updateClassLevelRaw(requestParameters: UpdateClassLevelRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<{ [key: string]: string; }>> {
        if (requestParameters['orgId'] == null) {
            throw new runtime.RequiredError(
                'orgId',
                'Required parameter "orgId" was null or undefined when calling updateClassLevel().'
            );
        }

        if (requestParameters['classLevelId'] == null) {
            throw new runtime.RequiredError(
                'classLevelId',
                'Required parameter "classLevelId" was null or undefined when calling updateClassLevel().'
            );
        }

        if (requestParameters['comEducationModelsUpdateClassLevelRequest'] == null) {
            throw new runtime.RequiredError(
                'comEducationModelsUpdateClassLevelRequest',
                'Required parameter "comEducationModelsUpdateClassLevelRequest" was null or undefined when calling updateClassLevel().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/orgs/{orgId}/class-levels/{classLevelId}`.replace(`{${"orgId"}}`, encodeURIComponent(String(requestParameters['orgId']))).replace(`{${"classLevelId"}}`, encodeURIComponent(String(requestParameters['classLevelId']))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: ComEducationModelsUpdateClassLevelRequestToJSON(requestParameters['comEducationModelsUpdateClassLevelRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Updates the information of an existing class level
     * Update class level information
     */
    async updateClassLevel(requestParameters: UpdateClassLevelRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<{ [key: string]: string; }> {
        const response = await this.updateClassLevelRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
