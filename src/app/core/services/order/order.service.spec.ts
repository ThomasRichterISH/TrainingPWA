import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { anything, instance, mock, verify, when } from 'ts-mockito';

import { OrderBaseData } from 'ish-core/models/order/order.interface';
import { ApiService } from 'ish-core/services/api/api.service';
import { BasketMockData } from 'ish-core/utils/dev/basket-mock-data';

import { OrderService } from './order.service';

describe('Order Service', () => {
  let orderService: OrderService;
  let apiService: ApiService;
  const basketMock = BasketMockData.getBasket();
  const orderMockData = {
    data: {
      id: 'test',
      documentNumber: '000001',
      status: 'New',
      statusCode: 'NEW',
    } as OrderBaseData,
  };

  beforeEach(() => {
    apiService = mock(ApiService);
    when(apiService.icmServerURL).thenReturn('http://server');

    TestBed.configureTestingModule({
      providers: [OrderService, { provide: ApiService, useFactory: () => instance(apiService) }],
    });

    orderService = TestBed.get(OrderService);
  });

  it("should create an order when 'createOrder' is called", done => {
    when(apiService.post(anything(), anything(), anything())).thenReturn(of(orderMockData));

    orderService.createOrder(basketMock, true).subscribe(data => {
      verify(apiService.post('orders', anything(), anything())).once();
      expect(data).toHaveProperty('id', 'test');
      done();
    });
  });

  it("should get orders when 'getOrders' is called without amount", done => {
    when(apiService.get(anything(), anything())).thenReturn(of({ data: [] }));

    orderService.getOrders().subscribe(() => {
      verify(apiService.get(`orders?page[limit]=30`, anything())).once();
      done();
    });
  });

  it("should get orders when 'getOrders' is called with amount", done => {
    when(apiService.get(anything(), anything())).thenReturn(of([]));

    const amount = 10;
    orderService.getOrders(amount).subscribe(() => {
      verify(apiService.get(`orders?page[limit]=10`, anything())).once();
      done();
    });
  });
});
