import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isLoggedIn()', () => {
    it('should return false when no token in localStorage', () => {
      expect(service.isLoggedIn()).toBeFalse();
    });

    it('should return true when token exists in localStorage', () => {
      localStorage.setItem('auth_token', 'some-token');
      expect(service.isLoggedIn()).toBeTrue();
    });
  });

  describe('getToken()', () => {
    it('should return null when no token stored', () => {
      expect(service.getToken()).toBeNull();
    });

    it('should return the stored token', () => {
      localStorage.setItem('auth_token', 'my-token');
      expect(service.getToken()).toBe('my-token');
    });
  });

  describe('logout()', () => {
    it('should remove token and navigate to /login', () => {
      localStorage.setItem('auth_token', 'some-token');
      const navigateSpy = spyOn(router, 'navigate');
      service.logout();
      expect(service.getToken()).toBeNull();
      expect(navigateSpy).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('login()', () => {
    it('should store access_token in localStorage on success', () => {
      service.login('admin', 'password').subscribe();
      const req = httpMock.expectOne('http://localhost:3000/auth/login');
      expect(req.request.method).toBe('POST');
      req.flush({ access_token: 'test-jwt-token' });
      expect(localStorage.getItem('auth_token')).toBe('test-jwt-token');
    });
  });
});
