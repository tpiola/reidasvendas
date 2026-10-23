import { notFound } from 'next/navigation';
// No case is published before its evidence and authorization exist.
export default function UnpublishedCase() {
  notFound();
}
