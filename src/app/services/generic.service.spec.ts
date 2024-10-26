import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GenericService } from './generic.service';
import { PaginatedResponse } from '../model/paginated-response.model'; // Ensure path is correct

describe('GenericService', () => {
  let service: GenericService<any>; // Use any or specify a type for testing
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GenericService]
    });

    service = TestBed.inject(GenericService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch paginated data', () => {
    const mockResponse: PaginatedResponse<any> = {
      content: [{ id: 1, name: 'Test Item' }], // Replace with your mock data
      last: false,
      number: 0,
      size: 10,
      numberOfElements: 1,
      totalElements: 20,
      totalPages: 2,
    };

    // Assuming the URL to be tested is '/api/test'
    const apiUrl = '/api/test';

    service.getPaginatedData(apiUrl, 0).subscribe(response => {
      expect(response).toEqual(mockResponse); // Assert that the response matches the mock data
      expect(response.content.length).toBe(1); // Check content length
    });

    const req = httpMock.expectOne(`${apiUrl}?page=0`); // Check that the correct request was made
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse); // Simulate a response from the server
  });
});
