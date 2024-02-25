import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  return next(
    (req = req.clone({
      headers: req.headers.set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjOWU4OTBiYi1jNmJkLTQzYmEtYTBmYi00OGYxOTQ3OGIxOGIiLCJ1c2VybmFtZSI6Ik1hcmMiLCJlbWFpbCI6InByb2dyYW1hcmNkZXZAZ21haWwuY29tIiwiaWF0IjoxNzA4ODc5NzEzfQ.oRD7-isJbLlG_uUBe9G-_e0lCHOlaLVDE5hN6Uym_2M'
      ),
    }))
  );
};
