import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import axios, { AxiosError } from 'axios';
import { AxiosAdapter } from './axios.adapter';

describe('AxiosAdapter', () => {
  let axiosAdapter: AxiosAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AxiosAdapter],
    }).compile();

    axiosAdapter = module.get<AxiosAdapter>(AxiosAdapter);
  });

  it('should fetch data successfully', async () => {
    // Mock the axios.get method to return a dummy response
    axios.get = jest.fn().mockResolvedValue({ data: 'dummyData' });

    const result = await axiosAdapter.get<string>('http://example.com');

    expect(result).toBe('dummyData');
    expect(axios.get).toHaveBeenCalledWith('http://example.com');
  });

  it('should throw NotFoundException for 404 response', async () => {
    const error: AxiosError = {
      response: {
        status: 404,
      },
    } as AxiosError;

    // Mock the axios.get method to throw the mocked error
    axios.get = jest.fn().mockRejectedValue(error);

    await expect(
      axiosAdapter.get<string>('http://example.com'),
    ).rejects.toThrowError(NotFoundException);
  });

  it('should throw InternalServerErrorException for other errors', async () => {
    const error: AxiosError = {
      response: {
        status: 403,
      },
    } as AxiosError;

    // Mock the axios.get method to throw the mocked error
    axios.get = jest.fn().mockRejectedValue(error);

    await expect(
      axiosAdapter.get<string>('http://example.com'),
    ).rejects.toThrowError(InternalServerErrorException);
  });
});
